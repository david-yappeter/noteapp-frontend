import { gql } from "@apollo/client";

const BOARD_CREATE = gql`
  mutation BOARD_CREATE($name: String!, $teamID: ID!) {
    board {
      create(input: { name: $name, team_id: $teamID }) {
        id
        name
        created_at
        updated_at
        team_id
      }
    }
  }
`;

const BOARD_DELETE = gql`
  mutation BOARD_DELETE($id: ID!) {
    board {
      delete(id: $id)
    }
  }
`;

export { BOARD_CREATE, BOARD_DELETE };
