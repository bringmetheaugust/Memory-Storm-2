const initialState = null;

export default function buffer(state = initialState, action){
	if(action.type === 'addItem'){
		if (state === null) return action.data;
		if (action.data.props.img === state.props.img){
			[action.data, state].forEach(i => i.toDisable());
			return null;
		}
		if (action.data.props.img !== state.props.img){
			[action.data, state].forEach(i => i.toCloseCard());
			return null;
		}
	}
	return state;
}