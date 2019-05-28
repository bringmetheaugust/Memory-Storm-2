import React from 'react';
import Game from './Game';
import Settings from './Settings';
import Alert from './Alert';
import Splash from './Splash';
import { connect } from 'react-redux';
import { createCardsList, combinedSettings } from '../redux/actionCreator/settings';
import StateInterface from '../interface/InitialState';
import ActionInterface from '../interface/action';

interface Props {
	createCardsList: ActionInterface
	combinedSettings: ActionInterface
	store: StateInterface
}

class App extends React.Component<Props, {}> {
	componentDidMount() {
		const localData = localStorage.getItem('settings');
		(localData && localData !== JSON.stringify(this.props.store.settings)) ?
			this.props.combinedSettings(JSON.parse(localData)) :
			this.props.createCardsList();
	}
	render = () =>
		<React.Fragment>
			<Splash />
			<Game />
			<Settings />
			<Alert />
		</React.Fragment>
}

export default connect(
	(state: StateInterface) => ({ store: state }),
	{ createCardsList, combinedSettings }
)(App);