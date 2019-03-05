import React from 'react';
import Card from './Card.jsx';

export default class Game extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='game-field-wrap'>
				<ul id='game-field'>
				</ul>
			</div>
		)
	}
}