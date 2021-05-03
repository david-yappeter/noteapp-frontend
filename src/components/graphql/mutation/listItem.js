import { gql } from "@apollo/client";

const LIST_ITEM_CREATE = gql`
  mutation LIST_ITEM_CREATE($name: String!, $listID: ID!) {
    list_item {
      create(input: { name: $name, list_id: $listID }) {
        id
      }
    }
  }
`;

const LIST_ITEM_MOVE = gql`
  mutation LIST_ITEM_MOVE($id: ID!, $listID: ID!, $index: ID!) {
    list_item {
      move(
        input: {
          id: $id
          destination_list_id: $listID
          destination_index: $index
        }
      )
    }
  }
`;

const LIST_ITEM_DELETE = gql`
  mutation LIST_ITEM_DELETE($id: ID!) {
    list_item {
      delete(id: $id)
    }
  }
`;

export { LIST_ITEM_MOVE, LIST_ITEM_CREATE, LIST_ITEM_DELETE };
