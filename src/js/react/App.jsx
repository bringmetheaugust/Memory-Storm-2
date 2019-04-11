import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import Splash from './Splash.jsx';
import { connect } from 'react-redux';
import { createCardsList, combinedSettings } from '../redux/actionCreator/settings.js';
import PropTypes from 'prop-types';

class App extends React.Component {
	componentDidMount() {
		const localData = localStorage.getItem('settings');
		(localData && localData !== JSON.stringify(this.props.store.settings)) ?
			this.props.combinedSettings(JSON.parse(localData)) :
			this.props.createCardsList();
	}
	render = () =>
		<React.Fragment>
			<Splash/>
			<Game />
			<Settings />
			<Alert />
		</React.Fragment>
}

App.propTypes = {
	store: PropTypes.object,
	createCardsList: PropTypes.func,
	combinedSettings: PropTypes.func
};

export default connect(
	state => ({ store: state }),
	{ createCardsList, combinedSettings }
)(App);