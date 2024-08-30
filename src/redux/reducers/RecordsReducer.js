import ActionTypes from "../actions/ActionTypes";

let initialState = {
    recordsList: [],
};

const RecordsReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_MEDICAL_RECORDS:
            state = {
                ...state, recordsList: action.payload,
            };
            break;

        default:
            break;
    }
    return state;
};

export default RecordsReducer;