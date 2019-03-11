const initialState = false;

export default function play(state = initialState, action){
	if(action.type === 'setGameAction'){
		return action.data;
	}
	return state;
}