import { gql } from "@apollo/client";

const TEAM_CREATE = gql`
  mutation TEAM_CREATE($name: String!) {
    team {
      create(name: $name) {
        id
        name
        created_at
        updated_at
        owner_id
      }
    }
  }
`;

const REMOVE_MEMBER = gql`
  mutation REMOVE_MEMBER($teamID: ID!, $userID: ID!) {
    team {
      remove_member(input: { team_id: $teamID, user_id: $userID })
    }
  }
`;

export { REMOVE_MEMBER, TEAM_CREATE };
