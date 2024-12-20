
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

const addHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.ADD_HOSPITAL_DOCTORS,
        payload,
    };
}

const updateHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.UPDATE_HOSPITAL_DOCTORS,
        payload,
    };
}

const delHospitalDoctors = (payload) => {
    return {
        type: ActionTypes.DEL_HOSPITAL_DOCTORS,
        payload,
    };
}

const getFavDoctors = (payload) => {
    return {
        type: ActionTypes.GET_FAV_DOCTORS,
        payload,
    };
}

const removeDocFromFavorites = (payload) => {
    return {
        type: ActionTypes.REMOVE_DOC_FROM_FAVORITES,
        payload,
    };
}

const addDocToFavorites = (payload) => {
    return {
        type: ActionTypes.ADD_DOC_TO_FAVORITES,
        payload,
    };
}

export {
    getAllDoctors,
    getHospitalDoctors,
    getDoctorDetails,
    clearDoctorDetails,
    clearAllDoctors,
    addHospitalDoctors,
    updateHospitalDoctors,
    getFavDoctors,
    removeDocFromFavorites,
    addDocToFavorites,
    delHospitalDoctors
};