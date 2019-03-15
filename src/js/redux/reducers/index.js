import {combineReducers} from 'redux';
import settings from './settings/index.js';
import play from './play/index.js';
import buffer from './buffer/index.js';

export default combineReducers({
	settings,
	play,
	buffer,
});