// @ts-ignore
import * as AT from '../actionType/index.ts';

export const setCounter = (num: number) => ({
	type: AT.SET_COUNTER,
	payload: num
});

export const setGameResult = (bool: boolean) => ({
	type: AT.SET_GAME_RESULT,
	payload: bool
});

export const setGameAction = (bool: boolean) => ({
	type: AT.SET_GAME_ACTION,
	payload: bool
});