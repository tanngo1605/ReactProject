//Add middleware to our store so when action
//is fired or dispatched, we can catch and
//display them
//action -> middleware -> root reducer
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';//allow browser to cache the store
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import rootReducer  from './root-reducer';
import rootSaga from "./root.sagas";

const sagaMiddleware =  createSagaMiddleware();

const middlewares = [sagaMiddleware];//more things will be 

if(process.env.NODE_ENV=='development'){
    middlewares.push(logger)
}



export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);
//export default store;