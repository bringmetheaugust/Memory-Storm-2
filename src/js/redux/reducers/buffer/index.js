const initialState = null;

export default function buffer(state = initialState, action){
	if(action.type === 'addItem'){
		if(state === null) return action.data;
		[action.data, state].forEach(i =>
			action.data.props.img === state.props.img ? i.toDisable() : i.toCloseCard());
		return null;
	}	
	return state;
}