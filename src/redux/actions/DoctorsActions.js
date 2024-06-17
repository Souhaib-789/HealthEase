
import ActionTypes from "./ActionTypes";

const getAllDoctors = (payload) => {
    return {
        type: ActionTypes.GET_ALL_DOCTORS,
        payload,
    };
    }
    

export { getAllDoctors };