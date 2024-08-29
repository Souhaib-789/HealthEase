import ActionTypes from "../actions/ActionTypes";

let initialState = {
    dashboardData: [],
};

const HospitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_DASHBOARD_DATA:
            state = { ...state, dashboardData: action.payload };
            break;

        default:
            break;
    }
    return state;
};

export default HospitalReducer;