const initialState = {
	play: false,
	result: null
};

export default function gameState(state = initialState, action){
	if (action.type === 'setGameAction') {
		if (action.win !== undefined) {
			return {
				play: !state.play,
				result: action.win
			};
		}
		return Object.assign({}, state, {play: !state.play});
	}
	return state;
}