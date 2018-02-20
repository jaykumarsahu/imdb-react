import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import reducer from '../reducers';
import sagas from '../sagas';
import {isProduction} from '../services/user-info';

const sagaMiddleware = createSagaMiddleware();

const middlewares = () =>{
  if(isProduction){
    return applyMiddleware(sagaMiddleware, reduxMiddleware)
  }
  return applyMiddleware(logger, sagaMiddleware, reduxMiddleware)
}

const store = createStore(
  reducer, middlewares(),
);

export default store;

sagaMiddleware.run(sagas);
