import ActionTypes from "../actions/ActionTypes";

let initialState = {
  myAppointmentList: [],
  doctorAppointmentList: [],
};

const AppointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.GET_MY_APPOINTMENTS:
      state = { ...state, myAppointmentList: action.payload };
      break;

    case ActionTypes.GET_DOCTOR_APPOINTMENTS:
      state = { ...state, doctorAppointmentList: action.payload };
      break;

    case ActionTypes.UPDATE_DOCTOR_APPOINTMENTS:
      let arr = [...state.doctorAppointmentList]
      let index_to_be_del = arr.findIndex((item) => item.id == action.payload.id)
      arr.splice(index_to_be_del, 1)
    
      state = { ...state, doctorAppointmentList: arr , };
      break;

    default:
      break;
  }
  return state;
};

export default AppointmentsReducer;