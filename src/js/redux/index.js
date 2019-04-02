import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer.js';

export const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(ReduxThunk),
	)
);