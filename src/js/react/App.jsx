import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';
import {connect} from 'react-redux';

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<React.Fragment>
				<Game/>
				<Settings/>
				<Alert/>
			</React.Fragment>
)}}

export default connect(
	state => ({store: state})
)(App);