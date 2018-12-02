import {
  RECEIVE_SESSION_ERRORS,
  SET_CURRENT_USER
} from "../actions/session_actions";
import { CLEAR_ERRORS } from "../actions/error_actions";

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
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