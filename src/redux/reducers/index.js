import {combineReducers} from 'redux';
import GeneralReducer from './GeneralReducer';
import AuthReducer from './AuthReducer';
import HealthbotReducer from './HealthbotReducer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorsReducer from './DoctorsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const AppReducers = combineReducers({
  GeneralReducer,
  AuthReducer,
  HealthbotReducer: persistReducer(persistConfig, HealthbotReducer),
  DoctorsReducer,
});

const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};

export default Reducer;