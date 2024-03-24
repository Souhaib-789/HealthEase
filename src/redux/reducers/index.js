import {combineReducers} from 'redux';
import GeneralReducer from './GeneralReducer';
import AuthReducer from './AuthReducer';


const AppReducers = combineReducers({
  GeneralReducer,
  AuthReducer,
});

const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};

export default Reducer;