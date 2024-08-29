import ActionTypes from './ActionTypes';

const getMedicalRecords = payload => {
    return {
        type: ActionTypes.GET_MEDICAL_RECORDS,
        payload,
    };
};

const addMedicalRecord = payload => {
    return {
        type: ActionTypes.ADD_MEDICAL_RECORD,
        payload,
    };
};

const delMedicalRecord = payload => {
    return {
        type: ActionTypes.DEL_MEDICAL_RECORD,
        payload,
    };
};


export { getMedicalRecords, delMedicalRecord, addMedicalRecord };