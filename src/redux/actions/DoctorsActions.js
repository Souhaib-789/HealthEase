
import ActionTypes from "./ActionTypes";

const getAllDoctors = (payload) => {
    return {
        type: ActionTypes.GET_ALL_DOCTORS,
        payload,
    };
    }

    
const getHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.GET_HOSPITAL_DOCTORS,
        payload,
    };
    }
    

export { getAllDoctors , getHospitalDoctors};