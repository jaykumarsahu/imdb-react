import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import reducer from '../reducers';
import logger from 'redux-logger';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import createSagaMiddleware from 'redux-saga';
import mySaga, { sagas } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(logger, sagaMiddleware, reduxMiddleware),
  // applyMiddleware(thunk, reduxMiddleware)
);

export default store;

sagaMiddleware.run(sagas);
