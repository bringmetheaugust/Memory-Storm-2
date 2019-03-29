import initialState from './initialState.js';

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_GAME_SETTINGS': {
			return {
				...state,
				settings: action.data
			}
		}
		case 'SET_CARDS': {
			return {
				...state,
				cards: action.data
			};
		}
		case 'SET_GAME_ACTION': {
			return {
				...state,
				gameState: {
					...state.gameState,
					play: !state.gameState.play
				}
			}
		}
		case 'OPEN_ALL_CARDS': {
			return {
				...state,
				cards: state.cards.map(i => ({...i, isOpen: action.data}))
			}
		}
		case 'SET_COUNTER': {
			return {
				...state,
				gameState: {
					...state.gameState,
					//TODO: try to reduce code
					counter: action.data === undefined ? --state.gameState.counter : action.data
				}
			}
		}
	}
	return state;
}