import { createStore } from 'redux';
// import {thunk} from 'redux-thunk';
import Reducer from './reducers';

const Store = createStore(Reducer);

Store.subscribe(()=> {
    // console.log('Store updated', Store.getState());
});
export default Store ;