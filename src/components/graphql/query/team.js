import { gql } from "@apollo/client";

const TEAM_BY_ID = gql`
  query TEAM_BY_ID($teamID: ID!) {
    team(id: $teamID) {
      id
      name
      created_at
      updated_at
      owner_id
      members {
        id
        name
        email
        created_at
        updated_at
        avatar
      }
      boards {
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
  }
`;

export { TEAM_BY_ID };
