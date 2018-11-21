import {
  RECEIVE_USER_ERRORS,
  SET_CURRENT_USER
} from "../util/user_api_util";
import { CLEAR_ERRORS } from "../actions/error_actions";

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.payload;
    case SET_CURRENT_USER:
      return {};
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}

export default sessionErrorsReducer;