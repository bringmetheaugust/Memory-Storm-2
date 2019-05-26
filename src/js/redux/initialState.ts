import InitialState from './interface/InitialState';

const initialState: InitialState = {
	settings: {
		density: 4,
		hiding: 5,
		time: 60
	},
	cards: [],
	gameState: {
		play: false,
		counter: 0,
		win: null
	}
};

export default initialState;