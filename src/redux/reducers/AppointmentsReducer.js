import ActionTypes from "../actions/ActionTypes";

let initialState = {
  appList: [],
};

const AppointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_APPOINTMENTS:
      state = { ...state, appList: action.payload };
      break;

    default:
      break;
  }
  return state;
};

export default AppointmentsReducer;