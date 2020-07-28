//Add middleware to our store so when action
//is fired or dispatched, we can catch and
//display them
//action -> middleware -> root reducer
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';//allow browser to cache the store
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer  from './root-reducer';

const middlewares = [logger, thunk];//more things will be added

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
//export default store;