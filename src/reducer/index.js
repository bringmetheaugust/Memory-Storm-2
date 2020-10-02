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

		case AT.SET_GAME_ACTION: {
			return {
				...state,
				gameState: { ...state.gameState, play: !state.gameState.play }
			}
		}

		case AT.TOGGLE_ALL_CARDS: {
			return {
				...state,
				cards: state.cards.map(i => ({ ...i, isOpen: i.isDisable ? true : payload }))
			}
		}

		case AT.DISACTIVE_ALL_CARDS: {
			return {
				...state,
				cards: state.cards.map(i => ({ ...i, isActive: !i.isDisable }))
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
				cards: state.cards.map(i => i.id === payload ?
					{ ...i, isOpen: true, isActive: false } :
					i
				)
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
				gameState: { ...state.gameState, win: payload }
			}
		}
	}

	return state;
}
