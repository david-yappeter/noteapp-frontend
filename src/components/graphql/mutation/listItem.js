import { gql } from "@apollo/client";

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

export { LIST_ITEM_MOVE };
