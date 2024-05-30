import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import Reducer from './reducers';
import { persistStore } from 'redux-persist';

const Store = createStore(Reducer, applyMiddleware(thunk));

const persist = persistStore(Store)

Store.subscribe(()=> {
    // console.log('Store updated', Store.getState());
});
export  {Store , persist} ;