const initialState = false;

export default function play(state = initialState, action){
	if(action.type === 'setGameAction'){
		return !state;
	}
	return state;
}