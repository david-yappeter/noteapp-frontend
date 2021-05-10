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

const TEAM_ADD_MEMBER = gql`
  mutation TEAM_ADD_MEMBER($teamID: ID!, $userID: ID!) {
    team {
      add_member(input: { team_id: $teamID, user_id: $userID }) {
        id
      }
    }
  }
`;

const TEAM_ADD_MEMBER_BY_EMAIL = gql`
  mutation TEAM_ADD_MEMBER_BY_EMAIL($teamID: ID!, $email: String!) {
    team {
      add_member_by_email(input: { team_id: $teamID, email: $email }) {
        id
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

export {
  REMOVE_MEMBER,
  TEAM_CREATE,
  TEAM_ADD_MEMBER,
  TEAM_ADD_MEMBER_BY_EMAIL,
};
