import { setGameAction, setCounter, setGameResult } from './gameState.js';
import { combinedSettings } from './settings.js';
import { openAllCards, closeAllCards } from './cards.js';

let counter;
let hideCards;

export const runGame = form => (dispatch, getState) => {
	dispatch(setGameAction());
	dispatch(combinedSettings(form));
	dispatch(setCounter(form.time))
	dispatch(openAllCards(true));
	localStorage.setItem('settings', JSON.stringify(form));
	hideCards = setTimeout(() => dispatch(closeAllCards()), form.hiding * 1000);
	let temporaryCount = getState().gameState.counter;
	counter = setInterval(() => {
		if (temporaryCount <= 1) return dispatch(endGame(false)), clearInterval(counter);
		dispatch(setCounter());
		temporaryCount--;
	}, 1000);
	dispatch(setGameResult(null));
};

export const endGame = bool => dispatch => {
	clearTimeout(hideCards);
	clearInterval(counter);
	dispatch(setGameAction());
	dispatch(openAllCards(false));
	dispatch(setCounter(0));
	dispatch(setGameResult(bool));
};