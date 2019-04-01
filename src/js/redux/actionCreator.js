import pictures from '../pictures.js';
let counter;
let hideCards;

const SET_GAME_ACTION = 'SET_GAME_ACTION';
const SET_CARDS = 'SET_CARDS';
const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';
const OPEN_ALL_CARDS = 'OPEN_ALL_CARDS';
const SET_COUNTER = 'SET_COUNTER';
const OPEN_CARD = 'OPEN_CARD';
const DISABLE_CARD = 'DISABLE_CARD';
const SET_GAME_RESULT = 'SET_GAME_RESULT';

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
	}))).sort(() => Math.random() - Math.random());
	dispatch(setCards(cards));
};

export const setGameAction = bool => ({
	type: SET_GAME_ACTION,
	payload: bool
});

export const setGameSettings = settings => ({
	type: SET_GAME_SETTINGS,
	payload: settings
});

export const combinedSettings = settings => dispatch => {
	dispatch(setGameSettings(settings));
	dispatch(createCardsList());
};

export const openAllCards = bool => ({
	type: OPEN_ALL_CARDS,
	payload: bool
});

export const setCounter = num => ({
	type: SET_COUNTER,
	payload: num
});

export const runGame = form => (dispatch, getState) => {
	dispatch(setGameAction());
	dispatch(combinedSettings(form));
	dispatch(setCounter(form.time))
	dispatch(openAllCards(true));
	localStorage.setItem('settings', JSON.stringify(form));
	window.scrollTo(0, 0);
	hideCards = setTimeout(() => dispatch(openAllCards(false)), form.hiding * 1000);
	let temporaryCount = getState().gameState.counter;
	counter = setInterval(() => {
		if (temporaryCount <= 1) {
			dispatch(endGame());
			clearInterval(counter);
			return dispatch(setGameResult(false));
		}
		dispatch(setCounter());
		temporaryCount--;
	}, 1000);
};

export const endGame = bool => dispatch => {
	clearTimeout(hideCards);
	clearInterval(counter);
	dispatch(setGameAction());
	dispatch(openAllCards(false));
	dispatch(setCounter(0));
	dispatch(setGameResult(bool));
};

export const activateCard = id => (dispatch, getState) => {
	dispatch(openCard(id));
	const openedCards = getState().cards.filter(i => (i.isOpen && !i.isDisable) === true);
	setTimeout(() => {
		if (openedCards.length > 1) {
			if (openedCards[0].img === openedCards[1].img) {
				openedCards.forEach(i => dispatch(disableCard(i.id)));
				if (getState().cards.every(i => i.isDisable === true)) return dispatch(endGame(true));
			}
		dispatch(openAllCards(false));
	}
	}, 500);
};

export const openCard = id => ({
	type: OPEN_CARD,
	payload: id
});

export const disableCard = id => ({
	type: DISABLE_CARD,
	payload: id
});

export const setGameResult = bool => ({
	type: SET_GAME_RESULT,
	payload: bool
});