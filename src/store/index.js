import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducer/index';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware),
	)
);

sagaMiddleware.run(rootSaga);
