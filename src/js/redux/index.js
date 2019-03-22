import {createStore} from 'redux';

var initialState = {
	settings: {
		density: 4,
		hiding: 5,
		time: 60
	},
	cards: [],
	play: false,
	result: null,
	buffer: null,
	score: null
};

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_CARDS': {
			return {
				...state,
				cards: action.data
			};
		}
		case 'SET_GAME_ACTION': {
			return {
				...state,
				play: !state.play
			}
		}
		case 'OPEN_ALL_CARDS': {
			return {
				...state,
				cards: state.cards.map(i => ({...i, isOpen: action.data}))
			}
		}
		case 'OPEN_CARD': {
			const a = state.cards.find(i => i.id === action.data);
			return {
				...state,
				buffer: a
			}
		}
		case 'SET_GAME_SETTINGS': {
			return {
				...state,
				settings: action.data
			}
		}
	}
	return state;
}