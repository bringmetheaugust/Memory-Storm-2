import pictures from '../../pictures.js';

const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';
const SET_CARDS = 'SET_CARDS';

export const setGameSettings = settings => ({
	type: SET_GAME_SETTINGS,
	payload: settings
});

export const setCards = cards => ({
	type: SET_CARDS,
	payload: cards
});

export const createCardsList = val => (dispatch, getState) => {
	const temporaryArr = pictures.sort(() => Math.random() - Math.random())
		.slice(0, Math.pow((val || getState().settings.density), 2) / 2);
	const cards = ([...temporaryArr, ...temporaryArr].map(i => ({
		id: String(Math.random()).slice(2, 12),
		img: i,
		isOpen: false,
		isDisable: false,
		isActive: false
	}))).sort(() => Math.random() - Math.random());
	dispatch(setCards(cards));
};

export const combinedSettings = settings => dispatch => {
	dispatch(setGameSettings(settings));
	dispatch(createCardsList());
};