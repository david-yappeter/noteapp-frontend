import { gql } from "@apollo/client";

const BOARD_BY_ID = gql`
  query BOARD_BY_ID($boardID: ID!) {
    board(id: $boardID) {
      id
      name
      created_at
      updated_at
      team_id
      lists {
        id
        name
        created_at
        updated_at
        prev
        next
        list_items {
          id
          name
          created_at
          updated_at
          next
          prev
        }
      }
    }
  }
`;

export { BOARD_BY_ID };
