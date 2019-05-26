import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
// @ts-ignore
import reducer from './reducer/index.ts';

export const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(ReduxThunk),
	)
);