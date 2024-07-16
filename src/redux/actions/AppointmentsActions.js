import ActionTypes from "./ActionTypes";

const getAppointments = payload => {
    return {
        type: ActionTypes.GET_APPOINTMENTS,
        payload,
    };
}

const getMyAppointments = payload => {
    return {
        type: ActionTypes.GET_MY_APPOINTMENTS,
        payload,
    };
}

export { getAppointments , getMyAppointments };
