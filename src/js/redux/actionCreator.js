import pictures from '../pictures.js';

export const setCards = cards => ({
	type: 'SET_CARDS',
	data: cards
});

export const createCardsList = () => (dispatch, getState) => {
	const temporaryArr = pictures.slice(0, Math.pow(getState().settings.density, 2) / 2);
	const cards = ([...temporaryArr, ...temporaryArr].map(i => ({
		id: String(Math.random()).slice(2, 12),
		img: i,
		isOpen: false,
		isDisable: false,
	})));
	dispatch(setCards(cards));
};

export const setGameAction = bool => ({
	type: 'SET_GAME_ACTION',
	data: bool
});

export const setGameSettings = settings => ({
	type: 'SET_GAME_SETTINGS',
	data: settings
});

export const combinedSettings = settings => dispatch => {
	dispatch(setGameSettings(settings));
	dispatch(createCardsList());
};

export const runCounter = () => ({ type: 'RUN_COUNTER '});

export const openAllCards = bool => ({
	type: 'OPEN_ALL_CARDS',
	data: bool
});

// export const openCard = (id) => ({
// 	type: 'OPEN_CARD',
// 	data: id
// });