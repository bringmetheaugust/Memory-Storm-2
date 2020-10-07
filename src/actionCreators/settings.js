import { SET_GAME_SETTINGS } from '../constants/actionTypes';

export const setGameSettings = settings => ({
	type: SET_GAME_SETTINGS,
	payload: settings
});
