const initialState = {
	buffer: null,
	score: 0
};

export default function buffer(state = initialState, action){
	if(action.type === 'addItem'){
		if(state.buffer === null) return Object.assign(state, {buffer: action.data});
		if(action.data.props.img === state.buffer.props.img){
			[action.data, state.buffer].forEach(i => i.toDisable());
			return Object.assign({}, {score: --state.score}, {buffer: null});
		}
		[action.data, state.buffer].forEach(i => i.toCloseCard());
		return Object.assign(state, {buffer: null});
	}
	if(action.type === 'setScore'){
		return Object.assign(state, {score: action.data});
	}
	return state;
}