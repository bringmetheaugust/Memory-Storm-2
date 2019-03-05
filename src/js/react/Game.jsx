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
				<div className='count'>
					time left :
					<div id='count'> 0 </div>
				</div>
			</div>

		)
	}
}