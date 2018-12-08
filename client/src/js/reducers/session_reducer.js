import { SET_CURRENT_USER, CHECK_USERNAME } from "../actions/session_actions";

const _nullUser = Object.freeze({ id: null, username: null, email: null });

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        id: action.payload.id || null,
        username: action.payload.username || null
      };
    case CHECK_USERNAME:
      return Object.assign(
        {}, state, { username: action.payload.username }
      );
    default:
      return state;
  }
};

export default sessionReducer;