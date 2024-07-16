import ActionTypes from "../actions/ActionTypes";

let initialState = {
  myAppointmentList: [],
};

const AppointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MY_APPOINTMENTS:
      state = { ...state, myAppointmentList: action.payload };
      break;

    default:
      break;
  }
  return state;
};

export default AppointmentsReducer;