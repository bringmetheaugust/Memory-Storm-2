// @ts-ignore
import initialState from '../initialState.ts';
// @ts-ignore
import * as AT from '../actionType/index.ts';
import State from '../interface/InitialState';
import Action from '../interface/action';
// @ts-ignore
import Card from '../interface/card.ts';

export default function reducer(state: State  = initialState, action: Action): State {
	switch (action.type) {
		case AT.SET_GAME_SETTINGS: {
			return { ...state, settings: action.payload }
		}
		case AT.SET_CARDS: {
			return { ...state, cards: action.payload };
		}
		case AT.SET_GAME_ACTION: {
			return {
				...state,
				gameState: { ...state.gameState, play: !state.gameState.play }
			}
		}
		case AT.OPEN_ALL_CARDS: {
			return {
				...state,
				cards: state.cards.map((i: Card) => ({ ...i, isOpen: i.isDisable ? true : action.payload }))
			}
		}
		case AT.DISACTIVE_ALL_CARDS: {
			return {
				...state,
				cards: state.cards.map((i: Card) => ({ ...i, isActive: !i.isDisable }))
			}
		}
		case AT.SET_COUNTER: {
			return {
				...state,
				gameState: {
					...state.gameState,
					counter: action.payload === undefined ? --state.gameState.counter : action.payload
				}
			}
		}
		case AT.OPEN_CARD: {
			return {
				...state,
				cards: state.cards.map((i: Card) => i.id === action.payload ?
					{ ...i, isOpen: true, isActive: false } :
					i
				),
			}
		}
		case AT.DISABLE_CARD: {
			return {
				...state,
				cards: state.cards.map((i: Card) => i.id === action.payload ? {...i, isDisable: true} : i)
			}
		}
		case AT.SET_GAME_RESULT: {
			return {
				...state,
				gameState: { ...state.gameState, win: action.payload }
			}
		}
	}
	return state;
}