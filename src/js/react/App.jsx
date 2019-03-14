import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import {connect} from 'react-redux';

const App = () =>
	<React.Fragment>
		<Game/>
		<Settings/>
		<Alert/>
	</React.Fragment>

export default App;