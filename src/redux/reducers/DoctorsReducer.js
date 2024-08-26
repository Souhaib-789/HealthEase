import ActionTypes from "../actions/ActionTypes";

let initialState = {
  allDoctors: [],
  dashboardDoctors: [],
  doctorDetails: {},
  hospitalDoctors: [],
  favDoctorsList: []
};

const DoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_DOCTORS:
      state = {
        ...state, allDoctors: action.payload,
        dashboardDoctors: action.payload.filter((item, index) => index < 3)
      };
      break;

    case ActionTypes.GET_FAV_DOCTORS:
      state = { ...state, favDoctorsList: action.payload };
      break;

    case ActionTypes.ADD_DOC_TO_FAVORITES:
      state = { ...state, favDoctorsList: [...state.favDoctorsList, action.payload] };
      break;

    case ActionTypes.REMOVE_DOC_FROM_FAVORITES:
      let curr_list = [...state.favDoctorsList]
      let index_to_be_del = curr_list.findIndex((e) => e.id == action.payload)
      curr_list.splice(index_to_be_del, 1)
      state = { ...state, favDoctorsList: curr_list }
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

    case ActionTypes.ADD_HOSPITAL_DOCTORS:
      state = { ...state, hospitalDoctors: [...state.hospitalDoctors, action.payload] };
      break;

    case ActionTypes.UPDATE_HOSPITAL_DOCTORS:
      let arr = [...state.hospitalDoctors];
      let index = arr.findIndex((item) => item.id == action.payload.id);
      arr.splice(index, 1, action.payload);
      state = { ...state, hospitalDoctors: arr };
      break;

    default:
      break;
  }
  return state;
};

export default DoctorsReducer;