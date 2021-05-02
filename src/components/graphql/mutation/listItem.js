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
  mutation MOVE_LIST_ITEM(
    $id: ID!
    $moveBeforeID: ID
    $moveAfterID: ID
    $moveBeforeListID: ID!
    $moveAfterListID: ID!
  ) {
    list_item {
      move(
        input: {
          id: $id
          move_before_id: $moveBeforeID
          move_after_id: $moveAfterID
          move_before_list_id: $moveBeforeListID
          move_after_list_id: $moveAfterListID
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
