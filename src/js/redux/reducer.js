import initialState from './initialState.js';

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_GAME_SETTINGS': {
			return { ...state, settings: action.payload }
		}
		case 'SET_CARDS': {
			return { ...state, cards: action.payload };
		}
		case 'SET_GAME_ACTION': {
			return {
				...state,
				gameState: { ...state.gameState, play: !state.gameState.play }
			}
		}
		case 'OPEN_ALL_CARDS': {
			return {
				...state,
				cards: state.cards.map(i => ({ ...i, isOpen: i.isDisable ? true : action.payload }))
			}
		}
		case 'DISACTIVE_ALL_CARDS': {
			return {
				...state,
				cards: state.cards.map(i => ({ ...i, isActive: i.isDisable ? false : true }))
			}
		}
		case 'SET_COUNTER': {
			return {
				...state,
				gameState: {
					...state.gameState,
					counter: action.payload === undefined ? --state.gameState.counter : action.payload
				}
			}
		}
		case 'OPEN_CARD': {
			return {
				...state,
				cards: state.cards.map(i => i.id === action.payload ? {...i, isOpen: true, isActive: false } : i),
			}
		}
		case 'DISABLE_CARD': {
			return {
				...state,
				cards: state.cards.map(i => i.id === action.payload ? {...i, isDisable: true} : i)
			}
		}
		case 'SET_GAME_RESULT': {
			return {
				...state,
				gameState: { ...state.gameState, win: action.payload }
			}
		}
	}
	return state;
}