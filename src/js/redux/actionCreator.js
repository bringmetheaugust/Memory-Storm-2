import pictures from '../pictures.js';
let counter;

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

export const openAllCards = bool => ({
	type: 'OPEN_ALL_CARDS',
	data: bool
});

export const setCounter = (num) => ({
	type: 'SET_COUNTER',
	data: num
});

export const runGame = form => (dispatch, getState) => {
	dispatch(setGameAction());
	dispatch(combinedSettings(form));
	dispatch(setCounter(form.time))
	dispatch(openAllCards(true));
	localStorage.setItem('settings', JSON.stringify(form));
	window.scrollTo(0, 0);
	let temporaryCount = getState().gameState.counter;
	counter = setInterval(() => {
		if (temporaryCount <= 1) clearInterval(counter), dispatch(endGame());
		dispatch(setCounter());
		--temporaryCount;
	}, 1000);
};

export const endGame = () => dispatch => {
	clearInterval(counter);
	dispatch(setCounter(0))
	dispatch(setGameAction());
	dispatch(openAllCards(false));

};

// export const openCard = (id) => ({
// 	type: 'OPEN_CARD',
// 	data: id
// });