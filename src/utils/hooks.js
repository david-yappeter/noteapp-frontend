import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { ME } from "../components/graphql";

const useToken = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const { data, loading, called, refetch } = useQuery(ME, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.access_token]);

  useEffect(() => {
    setUser(data ? data : null);
  }, [data]);

  return { user, loading, called, refetch };
};

const useForm = (initialValue, callback) => {
  const [inputVariables, setInputVariables] = useState(initialValue);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputVariables((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
    setInputVariables(initialValue);
  };

  return { inputVariables, setInputVariables, onChange, onSubmit };
};

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // function handleClickOutside(event) {
    // if (ref.current && !ref.current.contains(event.target)) {
    //     alert("You clicked outside of me!");
    // }
    // }

    // Bind the event listener
    document.addEventListener("mousedown", callback);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", callback);
    };
  }, [ref]);
}

const useWindow = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const onResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return width;
};

export { useToken, useForm, useOutsideAlerter, useWindow };
