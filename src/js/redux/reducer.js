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
				play: !state.play
			}
		}
		// TODO: DEVELOP METHOD TO OPEN ALL CARDS
		// case 'OPEN_ALL_CARDS': {
		// 	return {
		// 		...state,
		// 		cards: state.cards.map(i => ({...i, isOpen: action.data}))
		// 	}
		// }
	}
	return state;
}