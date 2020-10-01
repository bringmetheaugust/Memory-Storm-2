import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Game from './components/Game.jsx';
import Settings from './components/Settings.jsx';
import Alert from './components/Alert.jsx';
import { createCardsList, combinedSettings } from './actionCreators/settings';
import { SETTINGS_SELECTOR } from './store/selectors';

const App = () => {
	const dispatch = useDispatch();
	const settings = useSelector(SETTINGS_SELECTOR);

	useEffect(() => {
		const localData = localStorage.getItem('settings');

		(localData && localData !== JSON.stringify(settings)) ?
			dispatch(combinedSettings(JSON.parse(localData))) :
			dispatch(createCardsList());

		setTimeout(() => document.getElementById('splash').classList.add('hide'), 10000);
	}, []);

	return (
		<Fragment>
			<Game />
			<Settings />
			<Alert />
		</Fragment>
	);
}

export default App;
