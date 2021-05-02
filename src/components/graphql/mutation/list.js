import { gql } from "@apollo/client";

const LIST_CREATE = gql`
mutation LIST_CREATE ($name: String!, $boardID: ID!){
  list{
    create(input:{
      name: $name
      board_id: $boardID
    }){
      id
    }
  }
}`

const LIST_DELETE = gql`
  mutation LIST_DELETE($id: ID!) {
    list {
      delete(id: $id)
    }
  }
`;

export { LIST_DELETE, LIST_CREATE };
