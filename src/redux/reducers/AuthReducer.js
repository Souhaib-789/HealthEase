import ActionTypes from "../actions/ActionTypes";

let initialState = {
  isLogin: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.IS_LOGIN:
      state = {...state, isLogin: action.payload};
      break;

    case ActionTypes.USER_DATA:
      state = {...state, user: action.payload};
      break;

    case ActionTypes.LOGOUT:
      state = {user: null, isLogin: false};
      break;

    default:
      break;
  }
  return state;
};

export default AuthReducer;