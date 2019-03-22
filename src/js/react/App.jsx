import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import Splash from './Splash.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';
import { setCards } from '../redux/actionCreator.js';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const arr = pictures.slice(0, Math.pow(this.props.store.settings.density, 2) / 2);
		this.props.setCards([...arr, ...arr].map(i => ({
			id: String(Math.random()).slice(2, 12),
			img: i,
			isOpen: false,
			isDisable: false,
		})));
	}
	render = () =>
			<React.Fragment>
				{/*<Splash/>*/}
				<Game />
				{/*<Settings/>*/}
				{/*<Alert />*/}
			</React.Fragment>
}

export default connect(
	state => ({ store: state }),
	dispatch => ({ setCards: cards => dispatch(setCards(cards)) })
)(App);