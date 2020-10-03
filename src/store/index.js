import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducer/index';
import { rootSaga } from '../actionCreators/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware, reduxThunk),
	)
);

sagaMiddleware.run(rootSaga);
