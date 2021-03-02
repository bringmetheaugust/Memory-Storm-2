const initialState = {
	settings: {
		density: 4,
		hidingTime: 5,
		time: 60
	},
	cards: [],
	gameState: {
		play: false,
		counter: 0,
		result: null,
		picturesIsFetching: false
	}
};

export default initialState;
