import {
	SET_COUNTER, SET_GAME_RESULT, START_GAME,PICTURES_FETCHING, STOP_GAME, SET_ERROR
} from '../constants/actionTypes';

export const startGame = () => ({ type: START_GAME });

export const stopGame = () => ({ type: STOP_GAME });

export const setCounter = num => ({
	type: SET_COUNTER,
	payload: num
});

export const setGameResult = bool => ({
	type: SET_GAME_RESULT,
	payload: bool
});

export const setPicturesFetch = bool => ({
	type: PICTURES_FETCHING,
	payload: bool
});

export const setError = () => ({ type: SET_ERROR });
