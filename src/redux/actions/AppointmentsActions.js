import ActionTypes from "./ActionTypes";

const getDoctorAppointments = payload => {
    return {
        type: ActionTypes.GET_DOCTOR_APPOINTMENTS,
        payload,
    };
}

const updateDoctorAppointments = payload => {
    return {
        type: ActionTypes.UPDATE_DOCTOR_APPOINTMENTS,
        payload,
    };
}

const getMyAppointments = payload => {
    return {
        type: ActionTypes.GET_MY_APPOINTMENTS,
        payload,
    };
}

export { getDoctorAppointments , updateDoctorAppointments , getMyAppointments };
