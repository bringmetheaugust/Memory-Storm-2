import * as AT from '../actionTypes.js';

export const setCounter = num => ({
	type: AT.SET_COUNTER,
	payload: num
});

export const setGameResult = bool => ({
	type: AT.SET_GAME_RESULT,
	payload: bool
});

export const setGameAction = bool => ({
	type: AT.SET_GAME_ACTION,
	payload: bool
});