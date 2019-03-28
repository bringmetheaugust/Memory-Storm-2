import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer.js';
import pictures from '../pictures.js';
import { setCards } from './actionCreator.js';

const setReadyCards = store => next => action => {
	if (action.type === 'SET_CARDS') {
		const temporaryArr = pictures.slice(0, Math.pow(store.getState().settings.density, 2) / 2);
		const cards = ([...temporaryArr, ...temporaryArr].map(i => ({
			id: String(Math.random()).slice(2, 12),
			img: i,
			isOpen: false,
			isDisable: false,
		})));
		console.info('rendered cards :', cards);
		return next(setCards(cards));
	}
	return next(action);
};

export const store = createStore(
	reducer,
	compose(
		applyMiddleware(setReadyCards, ReduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);