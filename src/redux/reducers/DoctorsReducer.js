import ActionTypes from "../actions/ActionTypes";

let initialState = {
  allDoctors: [],
};

const DoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_DOCTORS:
      state = { ...state, allDoctors: action.payload };
      break;

    default:
      break;
  }
  return state;
};

export default DoctorsReducer;