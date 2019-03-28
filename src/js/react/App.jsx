import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import Splash from './Splash.jsx';
import { connect } from 'react-redux';
import { setGameSettings, setCards, combinedSettings } from '../redux/actionCreator.js';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const localData = localStorage.getItem('settings');
		localData && localData !== JSON.stringify(this.props.store.settings) ?
			this.props.combinedSettings(JSON.parse(localData)) :
			this.props.setCards(this.props.store.settings.density);
	}
	render = () =>
		<React.Fragment>
			{/*<Splash/>*/}
			<Game />
			<Settings/>
			{/*<Alert />*/}
		</React.Fragment>
}

export default connect(
	state => ({ store: state }),
	dispatch => ({
		setGameSettings: i => dispatch(setGameSettings(i)),
		setCards: i => dispatch(setCards(i)),
		combinedSettings: (settings) => dispatch(combinedSettings(settings))
	})
)(App);