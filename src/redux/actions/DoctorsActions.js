
import ActionTypes from "./ActionTypes";

const getAllDoctors = (payload) => {
    return {
        type: ActionTypes.GET_ALL_DOCTORS,
        payload,
    };
}

const clearAllDoctors = () => {
    return {
        type: ActionTypes.CLEAR_ALL_DOCTORS,
    };
}

const getDoctorDetails = (payload) => {
    return {
        type: ActionTypes.GET_DOCTOR_DETAILS,
        payload,
    };
}

const clearDoctorDetails = () => {
    return {
        type: ActionTypes.CLEAR_DOCTOR_DETAILS,
    };
}


const getHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.GET_HOSPITAL_DOCTORS,
        payload,
    };
}

const updateHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.UPDATE_HOSPITAL_DOCTORS,
        payload,
    };
}


export { getAllDoctors, getHospitalDoctors, getDoctorDetails, clearDoctorDetails ,clearAllDoctors, updateHospitalDoctors };