import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { ME } from "../components/graphql";

const useToken = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [meUser, { data, loading, called }] = useLazyQuery(ME, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });
  useEffect(() => {
    meUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.access_token]);

  useEffect(() => {
    setUser(data ? data : null);
  }, [data]);

  return { user, loading, called };
};

export { useToken };
