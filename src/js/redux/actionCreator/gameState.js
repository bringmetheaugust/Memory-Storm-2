const SET_GAME_ACTION = 'SET_GAME_ACTION';
const SET_COUNTER = 'SET_COUNTER';
const SET_GAME_RESULT = 'SET_GAME_RESULT';

export const setCounter = num => ({
	type: SET_COUNTER,
	payload: num
});

export const setGameResult = bool => ({
	type: SET_GAME_RESULT,
	payload: bool
});

export const setGameAction = bool => ({
	type: SET_GAME_ACTION,
	payload: bool
});