import {combineReducers} from 'redux';
import settings from './settings/index.js';
import gameState from './gameState/index.js';
import buffer from './buffer/index.js';

export default combineReducers({
	settings,
	gameState,
	buffer,
});