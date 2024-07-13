import ActionTypes from "./ActionTypes";

const getAppointments = payload => {
    return {
        type: ActionTypes.GET_APPOINTMENTS,
        payload,
    };
}

export { getAppointments };
