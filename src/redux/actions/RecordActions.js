import ActionTypes from './ActionTypes';

const getMedicalRecords = payload => {
    return {
        type: ActionTypes.GET_MEDICAL_RECORDS,
        payload,
    };
};

export { getMedicalRecords };