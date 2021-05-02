import { ME } from "./query/user.js";
import { TEAM_BY_ID } from "./query/team.js";
import { BOARD_BY_ID } from "./query/board.js";
import {
  LIST_ITEM_MOVE,
  LIST_ITEM_CREATE,
  LIST_ITEM_DELETE,
} from "./mutation/listItem.js";
import { REMOVE_MEMBER, TEAM_CREATE } from "./mutation/team.js";
import { BOARD_CREATE, BOARD_DELETE } from "./mutation/board.js";
import { LOGIN, REGISTER } from "./mutation/auth";
import { LIST_DELETE, LIST_CREATE } from "./mutation/list";

export {
  BOARD_CREATE,
  TEAM_CREATE,
  ME,
  TEAM_BY_ID,
  BOARD_BY_ID,
  LIST_ITEM_MOVE,
  REMOVE_MEMBER,
  BOARD_DELETE,
  LOGIN,
  REGISTER,
  LIST_DELETE,
  LIST_CREATE,
  LIST_ITEM_CREATE,
  LIST_ITEM_DELETE,
};
