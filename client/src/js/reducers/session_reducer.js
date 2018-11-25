import { SET_CURRENT_USER, CHECK_USERNAME } from "../util/user_api_util";

const _nullUser = Object.freeze({ id: null, username: null, email: null });

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        id: action.payload.id || null,
        username: action.payload.username || null,
        email: action.payload.email || null
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