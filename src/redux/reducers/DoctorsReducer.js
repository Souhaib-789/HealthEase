import ActionTypes from "../actions/ActionTypes";

let initialState = {
  allDoctors: [],
  dashboardDoctors: [],
  doctorDetails: {},
  hospitalDoctors: [],
};

const DoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_DOCTORS:
      state = {
        ...state, allDoctors: action.payload,
        dashboardDoctors: action.payload.filter((item, index) => index < 3)
      };
      break;

    case ActionTypes.CLEAR_ALL_DOCTORS:
      state = {
        ...state, allDoctors: [],
        dashboardDoctors: []
      };
      break;

    case ActionTypes.GET_DOCTOR_DETAILS:
      state = { ...state, doctorDetails: action.payload };
      break;

    case ActionTypes.CLEAR_DOCTOR_DETAILS:
      state = { ...state, doctorDetails: {} };
      break;

    case ActionTypes.GET_HOSPITAL_DOCTORS:
      state = { ...state, hospitalDoctors: action.payload };
      break;

    case ActionTypes.UPDATE_HOSPITAL_DOCTORS:
      // let copy = state.hospitalDoctors;
      // copy.push(action.payload);
      state = { ...state, hospitalDoctors: [...state.hospitalDoctors , action.payload] };
      break;

    default:
      break;
  }
  return state;
};

export default DoctorsReducer;