import React, { useState, memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DoubleButton from './DoubleButton.jsx';
import InputText from './InputText.jsx';
import { setGameAction } from '../actionCreators/gameState';
import { setGameSettings } from '../actionCreators/settings';

import * as GS from '../constants/gameSettings';
import { SETTINGS_SELECTOR, GAME_STATE_SELECTOR } from '../store/selectors';

const DEFAULT_FIELD_STATUSES = {
	density: false,
	time: false,
	hidingTime: false
};

const Settings = () => {
	const [ invalidFields, setFieldStatus ] = useState(DEFAULT_FIELD_STATUSES);
	const gameSettings = useSelector(SETTINGS_SELECTOR);
	const { play } = useSelector(GAME_STATE_SELECTOR);
	const dispatch = useDispatch();

	const validateForm = useCallback((id, value) => {
		let invalidFieldId = null;

		switch (true) {
			case (id === 'density'):
				if (value < GS.MIN_DENSITY || value > GS.MAX_DENSITY || value % 2) invalidFieldId = id;
				break;

			case (id === 'hidingTime'):
				if (value < GS.MIN_HIDING_TIME || value > GS.MAX_HIDING_TIME) invalidFieldId = id;
				break;

			case (id === 'time'):
				if (value < GS.MIN_GAME_TIME || value > GS.MAX_GAME_TIME) invalidFieldId = id;
				break;
		}

		if (invalidFieldId || Number.isNaN(Number(value))) {
			setFieldStatus({ ...invalidFields, [invalidFieldId]: true });
		} else {
			setFieldStatus(DEFAULT_FIELD_STATUSES);
			dispatch(setGameSettings({ ...gameSettings, [id]: +value }));
		}
	}, [gameSettings]);

	const toSubmit = useCallback(() => {
		if (play) return dispatch(setGameAction(false));

		window.scrollTo(0, 0);
		dispatch(setGameAction(true));
	}, [play]);

	return (
		<form id='settings' className={`${play && 'play'}`}>
			<InputText
				handleChange={validateForm}
				label="select grid density"
				id="density"
				val={gameSettings.density}
				error={invalidFields.density}
				errorText={`Please, set any number from ${GS.MIN_DENSITY} to ${GS.MAX_DENSITY} multiples of two`}
			/>
			<InputText
				handleChange={validateForm}
				label="select time for pictures hidingTime (sec)"
				id="hidingTime"
				val={gameSettings.hidingTime}
				error={invalidFields.hidingTime}
				errorText={`Please, set any number from ${GS.MIN_HIDING_TIME} to ${GS.MAX_HIDING_TIME}`}
			/>
			<InputText
				handleChange={validateForm}
				label="select game time (sec)"
				id="time"
				val={gameSettings.time}
				error={invalidFields.time}
				errorText={`Please, set any number form ${GS.MIN_GAME_TIME} to ${GS.MAX_GAME_TIME}`}
			/>
			<DoubleButton
				play={play}
				handleSubmit={ !Object.values(invalidFields).some(field => field) && toSubmit }
				firstBlock='play'
				secondBlock='stop'
			/>
		</form>
	);
};

export default memo(Settings);
