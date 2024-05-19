import ActionTypes from "../actions/ActionTypes";

let initialState = {
  chatList: [],
};

const HealthbotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CHAT:
      state = { ...state, chatList: action.payload };
      break;

    default:
      break;
  }
  return state;
};

export default HealthbotReducer;