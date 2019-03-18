const initialState = false;

export default function gameState(state = initialState, action){
	if(action.type === 'setGameAction'){
		return !state;
	}
	return state;
}