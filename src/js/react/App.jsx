import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import Splash from './Splash.jsx';
import {connect} from 'react-redux';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = { gameOver: false }
	}
	componentWillReceiveProps(nextPr){
		if (!nextPr.play) this.setState({gameOver: true});
	}
	closeAlert = () => this.setState({ gameOver: false });
	render = () =>
			<React.Fragment>
				<Splash/>
				<Game/>
				<Settings/>
				{
					this.state.gameOver && <Alert closeAlert = {this.closeAlert}/>
				}
			</React.Fragment>
}

export default connect(
	state => ({ play: state.gameState.play }),
)(App);