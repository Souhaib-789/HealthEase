import ActionTypes from './ActionTypes';

const saveChat = payload => {
  return {
    type: ActionTypes.SAVE_CHAT,
    payload,
  };
};


export {saveChat  };