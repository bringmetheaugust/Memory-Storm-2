import {createStore} from 'redux';
import reducers from './reducers/index.js';
import {setGameAction} from './reducers/gameState/actionCreator.js';
import {setGameResultScore} from './reducers/buffer/actionCreator.js';

export const store = createStore(reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	if (store.getState().buffer.score === 0) {
		store.dispatch(setGameResultScore(null));
		store.dispatch(setGameAction(true));
	}
})