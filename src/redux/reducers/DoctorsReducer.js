import ActionTypes from "../actions/ActionTypes";

let initialState = {
  allDoctors: [],
  hospitalDoctors: [],
};

const DoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_DOCTORS:
      state = { ...state, allDoctors: action.payload };
      break;

      case ActionTypes.GET_HOSPITAL_DOCTORS:
        state = { ...state, hospitalDoctors: action.payload };
        break;

    default:
      break;
  }
  return state;
};

export default DoctorsReducer;