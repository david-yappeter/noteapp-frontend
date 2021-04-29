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


export {BOARD_CREATE}