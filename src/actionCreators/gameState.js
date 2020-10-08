import {
	SET_GAME_STATE, SET_COUNTER, SET_GAME_RESULT, SET_GAME_ACTION, PICTURES_FETCHING
} from '../constants/actionTypes';

export const setGameState = gameState => ({
	type: SET_GAME_STATE,
	payload: gameState
});

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

export const setPicturesFetch = bool => ({
	type: PICTURES_FETCHING,
	payload: bool
});

export const startCounter = () => (dispatch, getState) => {
	const { time } = getState().settings;
	const newCounterId = setInterval(() => dispatch(setCounter()), 1000);

	dispatch(setGameState({ counter: time, counterId: newCounterId }));
};
