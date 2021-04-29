import React, { useReducer, useState } from "react";
import _ from "lodash";
import { Grid, Header, Search, Segment } from "semantic-ui-react";
import { UserSearchReducer } from "../utils/reducer";

const UserSearch = ({ users }) => {
  const source = users.map((user) => ({
    id: user.id,
    title: user.name,
    description: user.email,
    image: user.avatar,
  }));

  const [state, dispatch] = UserSearchReducer();

  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) =>
        re.test(result.title) || re.test(result.description);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            })
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  );
};

export default UserSearch;
