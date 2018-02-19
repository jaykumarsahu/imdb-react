import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import reducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(logger, sagaMiddleware, reduxMiddleware),
);

export default store;

sagaMiddleware.run(sagas);
