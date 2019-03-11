import React from 'react';
import Card from './Card.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';

class Game extends React.Component{
	constructor(props){
		super(props);
	}
	toGenerateCards(){
		let arr = pictures.slice(0, Math.pow(this.props.store.density, 2) / 2);
		return arr.concat(arr).sort(() => Math.random() - Math.random());
	}
	render(){
		const arrayOfPictures = this.toGenerateCards();
		return(
			<div className='game-field-wrap'>
				<ul id='game-field' style = {{gridTemplate : `repeat(${this.props.store.density}, 1fr)/repeat(${this.props.store.density}, 1fr)`}} >
					{
						arrayOfPictures.map((i, n) => <Card key = {n} img = {i}/>)
					}
				</ul>
				<div className='count'>
					time left :
					<div id='count'> 0 </div>
				</div>
			</div>

)}}

export default connect(
	state => ({store: state.settings})
)(Game);