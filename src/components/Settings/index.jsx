import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import css from './index.module.sass';
import DoubleButton from '../DoubleButton/index.jsx';
import InputText from '../InputText/index.jsx';
import { startGame, stopGame } from '../../actionCreators/gameState';
import { resetGame } from '../../actionCreators/common';
import { setGameSettings } from '../../actionCreators/settings';

import * as GS from '../../constants/gameSettings';
import { SETTINGS_SELECTOR, GAME_STATE_SELECTOR } from '../../store/selectors';

const DEFAULT_FIELD_STATUSES = {
	density: false,
	time: false,
	hidingTime: false
};

const Settings = () => {
	const [ invalidFields, setFieldStatus ] = useState(DEFAULT_FIELD_STATUSES);
	const gameSettings = useSelector(SETTINGS_SELECTOR);
	const { play } = useSelector(GAME_STATE_SELECTOR, shallowEqual);
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
		if (play) {
			dispatch(stopGame());
			dispatch(resetGame());
		} else {
			window.scrollTo(0, 0);
			dispatch(startGame());
		}
	}, [play]);

	return (
		<form className={`${css.index} ${ play && css.play }`}>
			<InputText
				handleChange={validateForm}
				label="grid density"
				id="density"
				val={gameSettings.density}
				error={invalidFields.density}
				errorText={`Please, set any number from ${GS.MIN_DENSITY} to ${GS.MAX_DENSITY} multiples of two`}
				classNames={css.input}
			/>
			<InputText
				handleChange={validateForm}
				label="pictures hiding time(sec)"
				id="hidingTime"
				val={gameSettings.hidingTime}
				error={invalidFields.hidingTime}
				errorText={`Please, set any number from ${GS.MIN_HIDING_TIME} to ${GS.MAX_HIDING_TIME}`}
				classNames={css.input}
			/>
			<InputText
				handleChange={validateForm}
				label="game time(sec)"
				id="time"
				val={gameSettings.time}
				error={invalidFields.time}
				errorText={`Please, set any number form ${GS.MIN_GAME_TIME} to ${GS.MAX_GAME_TIME}`}
				classNames={css.input}
			/>
			<DoubleButton
				isActive={play}
				handleSubmit={ !Object.values(invalidFields).some(field => field) && toSubmit }
				firstBlock='play'
				secondBlock='stop'
			/>
		</form>
	);
};

export default Settings;
