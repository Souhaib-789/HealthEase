import ActionTypes from './ActionTypes';

const showAlert = payload => {
  return {
    type: ActionTypes.SHOW_ALERT,
    payload,
  };
};

const hideAlert = () => {
  return {
    type: ActionTypes.HIDE_ALERT,
  };
};

const showLoading = () => {
  return {
    type: ActionTypes.SHOW_LOADING,
  };
};

const hideLoading = () => {
  return {
    type: ActionTypes.HIDE_LOADING,
  };
};

export { showLoading, hideLoading, showAlert, hideAlert };