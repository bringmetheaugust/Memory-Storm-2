import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import {connect} from 'react-redux';
import {setGameAction} from '../redux/reducers/play/actionCreator.js';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			gameOver: false
		}
	}
	closeAlert = () => this.setState({gameOver: false});
	render(){
		return(
			<React.Fragment>
				<Game/>
				<Settings/>
				{
					this.state.gameOver && <Alert closeAlert = {this.closeAlert} win = {true}/>
				}
			</React.Fragment>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch =>({
		setGameAction: () => dispatch(setGameAction())
	})
)(App);