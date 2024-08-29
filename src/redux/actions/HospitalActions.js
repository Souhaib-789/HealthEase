import ActionTypes from './ActionTypes';

const getDashbaordData = payload => {
  return {
    type: ActionTypes.GET_DASHBOARD_DATA,
    payload,
  };
};


export {getDashbaordData};