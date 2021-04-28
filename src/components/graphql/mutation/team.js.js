import { gql } from "@apollo/client";

const REMOVE_MEMBER = gql`
  mutation REMOVE_MEMBER($teamID: ID!, $userID: ID!) {
    team {
      remove_member(input: { team_id: $teamID, user_id: $userID })
    }
  }
`;

export { REMOVE_MEMBER };
