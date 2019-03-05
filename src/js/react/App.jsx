import React from 'react';
import Game from './Game.jsx';
import Settings from './Settings.jsx';
import Alert from './Alert.jsx';

export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state={};
	}
	render(){
		return(
			<React.Fragment>
				<Game/>
				<Settings/>
			</React.Fragment>
		)
	}
}