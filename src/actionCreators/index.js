import { RESET_GAME } from '../constants/actionTypes';

export const resetGame = () => ({
	type: RESET_GAME
});

// let counterCount;
// let hideCardsCount;

// export const runGame = () => (dispatch, getState) => {
// 	const { settings, gameState } = getState();
// 	const { hiding } = settings;

// 	dispatch(setGameAction());
// 	dispatch(setCounter(settings.time));
// 	dispatch(toggleAllCards(true));
// 	dispatch(setGameResult(null));

// 	hideCardsCount = setTimeout(() => dispatch(closeAllCards()), hiding * 1000);
// 	counterCount = setInterval(() => dispatch(setCounter()), 1000);

// 	localStorage.setItem('settings', JSON.stringify(settings));
// };

// export const endGame = bool => dispatch => {
// 	clearTimeout(hideCardsCount);
// 	clearInterval(counterCount);
// 	dispatch(setGameAction());
// 	dispatch(toggleAllCards(false));
// 	dispatch(setCounter(0));
// 	dispatch(setGameResult(bool));
// };
