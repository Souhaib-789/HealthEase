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

        case ActionTypes.ADD_MEDICAL_RECORD:
            state = { ...state, recordsList: [...state.recordsList, action.payload] };
            break;

        case ActionTypes.DEL_MEDICAL_RECORD:
            let curr_list = [...state.recordsList]
            let index_to_be_del = curr_list.findIndex((e) => e.id == action.payload)
            curr_list.splice(index_to_be_del, 1)
            state = { ...state, recordsList: curr_list }
            break;


        default:
            break;
    }
    return state;
};

export default RecordsReducer;