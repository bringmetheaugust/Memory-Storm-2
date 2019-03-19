const initialState = {
	buffer: null,
	score: null
};

export default function buffer(state = initialState, action){
	if (action.type === 'addItem') {
		if (state.buffer === null) return Object.assign(state, {buffer: action.data});
		if (action.data.img === state.buffer.img) {
			[action.data, state.buffer].forEach(i => i.disable());
			return Object.assign({}, {score: --state.score}, {buffer: null});
		}
		[action.data, state.buffer].forEach(i => i.close());
		return Object.assign(state, {buffer: null});
	}
	if (action.type === 'clear') {
		return {buffer: null, score: null};
	}
	if (action.type === 'setScore') {
		return Object.assign(state, {score: action.data});
	}
	return state;
}