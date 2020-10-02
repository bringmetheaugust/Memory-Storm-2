import * as AT from '../constants/actionTypes';

export const setGameSettings = settings => ({
	type: AT.SET_GAME_SETTINGS,
	payload: settings
});
