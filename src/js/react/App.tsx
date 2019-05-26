import React from 'react';
import Game from './Game.tsx';
import Settings from './Settings.tsx';
import Alert from './Alert.tsx';
import Splash from './Splash.tsx';
import { connect } from 'react-redux';
import { createCardsList, combinedSettings } from '../redux/actionCreator/settings.ts';
import StateInterface from '../interface/InitialState.ts';
import ActionInterface from '../interface/action.ts';

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