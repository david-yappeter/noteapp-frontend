import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { ME } from "../components/graphql";

const useToken = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [meUser, { data }] = useLazyQuery(ME, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });
  useEffect(() => {
    waitAsync();
  }, [cookies.access_token]);

  useEffect(() => {
    setUser(data ? data : null);
    console.log(data);
  }, [data]);

  const waitAsync = async () => {
    await meUser();
  };

  return user;
};

export { useToken };
