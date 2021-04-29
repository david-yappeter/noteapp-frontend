import React, { useEffect, useReducer, useState } from "react";

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
};

const initialState = {
  loading: false,
  results: [],
  value: "",
};

const UserSearchReducer = () => {
  const [state, dispatch] = useReducer(exampleReducer, initialState);
  const [value, setValue] = useState(state);

  useEffect(() => {
    setValue(state);
  }, [state]);

  return { state, dispatch, value };
};

export { UserSearchReducer };
