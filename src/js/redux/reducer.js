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
				cards: state.cards.map(i => ({...i, isOpen: i.isDisable ? true : action.data}))
			}
		}
		case 'SET_COUNTER': {
			return {
				...state,
				gameState: {
					...state.gameState,
					counter: action.data === undefined ? --state.gameState.counter : action.data
				}
			}
		}
		case 'OPEN_CARD': {
			return {
				...state,
				cards: state.cards.map(i => i.id === action.data ? {...i, isOpen: true} : i)
			}
		}
		case 'DISABLE_CARD': {
			return {
				...state,
				cards: state.cards.map(i => i.id === action.data ? {...i, isDisable: true} : i)
			}
		}
		case 'SET_GAME_RESULT': {
			return {
				...state,
				gameState: {
					...state.gameState,
					win: action.payload
				}
			}
		}
	}
	return state;
}