//Add middleware to our store so when action
//is fired or dispatched, we can catch and
//display them
//action -> middleware -> root reducer
import {createStore, applyMiddleware} from 'redux';

import logger from 'redux-logger';

import rootReducer  from './root-reducer';

const middlewares = [logger];//more things will be added

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;