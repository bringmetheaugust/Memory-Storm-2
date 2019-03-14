const initialState = null;

export default function buffer(state = initialState, action){
	if(action.type === 'addItem'){
		
		return action.data;
	}
	return state;
}