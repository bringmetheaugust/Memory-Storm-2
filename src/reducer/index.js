import initialState from './initialState';
import * as AT from '../constants/actionTypes';

export default function(state  = initialState, { type, payload }) {
	switch (type) {
		case AT.SET_GAME_SETTINGS: {
			return { ...state, settings: payload }
		}
		
		case AT.SET_CARDS: {
			return { ...state, cards: payload };
		}

		case AT.START_GAME: {
			return {
				...state,
				gameState: {
					...state.gameState,
					play: true,
					error: false
				}
			}
		}

		case AT.STOP_GAME: {
			return {
				...state,
				gameState: { ...state.gameState, play: false }
			}
		}

		case AT.PICTURES_FETCHING: {
			return {
				...state,
				gameState: { ...state.gameState, picturesIsFetching: payload }
			}
		}

		case AT.SET_FAKE_CARDS: {
			return {
				...state,
				cards: [ ...Array(state.settings.density ** 2) ].map(() => ({ id: Math.random() }))
			}
		}

		case AT.TOGGLE_ALL_CARDS: {
			return {
				...state,
				cards: state.cards.map(i => ({ ...i, isOpen: i.isDisable ? true : payload }))
			}
		}

		case AT.SET_COUNTER: {
			return {
				...state,
				gameState: {
					...state.gameState,
					counter: payload === undefined ? --state.gameState.counter : payload
				}
			}
		}

		case AT.OPEN_CARD: {
			return {
				...state,
				cards: state.cards.map(i => i.id === payload ? { ...i, isOpen: true } : i)
			}
		}

		case AT.DISABLE_CARD: {
			return {
				...state,
				cards: state.cards.map(i => i.id === payload ? {...i, isDisable: true} : i)
			}
		}

		case AT.SET_GAME_RESULT: {
			return {
				...state,
				gameState: { ...state.gameState, result: payload }
			}
		}

		case AT.RESET_GAME: {
			return {
				...state,
				gameState: initialState.gameState
			}
		}

		case AT.SET_ERROR: {
			return {
				...state,
				gameState: { ...state.gameState, error: true }
			}
		}
	}

	return state;
}
