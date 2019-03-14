 const initialState = 0;

 export default function result(state = initialState, action){
	if(action.type === 'setResult'){
		return action.data;
	}
	if(action.type === 'decrement'){
		return --state;
	}
	return state;
}