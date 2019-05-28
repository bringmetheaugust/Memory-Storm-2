import { setGameAction, setCounter, setGameResult } from './gameState.ts';
import { combinedSettings } from './settings.ts';
import { openAllCards, closeAllCards } from './cards.ts';
import State from '../../interface/InitialState.ts';

let counter: any;
let hideCards: any;

export const runGame = (form: State.settings) => (dispatch: any, getState: any) => {
	dispatch(setGameAction());
	dispatch(combinedSettings(form));
	dispatch(setCounter(form.time))
	dispatch(openAllCards(true));
	localStorage.setItem('settings', JSON.stringify(form));
	hideCards = setTimeout(() => dispatch(closeAllCards()), form.hiding * 1000);
	let temporaryCount: number = getState().gameState.counter;
	counter = setInterval(() => {
		if (temporaryCount <= 1) return dispatch(endGame(false)), clearInterval(counter);
		dispatch(setCounter());
		temporaryCount--;
	}, 1000);
	dispatch(setGameResult(null));
};

export const endGame = (bool: boolean) => (dispatch: any) => {
	clearTimeout(hideCards);
	clearInterval(counter);
	dispatch(setGameAction());
	dispatch(openAllCards(false));
	dispatch(setCounter(0));
	dispatch(setGameResult(bool));
};