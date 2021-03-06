import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import GameField from './components/GameField/index.jsx';
import Settings from './components/Settings/index.jsx';
import Alert from './components/Alert/index.jsx';
import { setGameSettings } from './actionCreators/settings';

import { SETTINGS_SELECTOR, GAME_STATE_SELECTOR } from './store/selectors';

const App = () => {
	const settings = useSelector(SETTINGS_SELECTOR);
	const { result } = useSelector(GAME_STATE_SELECTOR, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		const localData = localStorage.getItem('settings');

		if (localData && localData !== JSON.stringify(settings)) {
			dispatch(setGameSettings(JSON.parse(localData)));
		}
		
		setTimeout(() => document.getElementById('splash').classList.add('hide'), 10000);
	}, []);

	return (
		<Fragment>
			<GameField />
			<Settings />
			{ typeof result === 'boolean' && <Alert result={result} /> }
		</Fragment>
	);
}

export default App;
