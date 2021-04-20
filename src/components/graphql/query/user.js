import { gql } from "@apollo/client";

const ME = gql`
  query {
    me {
      id
      name
      email
      avatar
      teams {
        id
        name
        created_at
        owner_id
      }
    }
  }
`;

export { ME };
