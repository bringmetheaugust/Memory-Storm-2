import React from 'react';
import Card from './Card.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.count = React.createRef();
	}
	componentWillReceiveProps = (pr) =>{
		if(pr.store.play){
			let count = pr.store.settings.time;
			this.countInterval = setInterval(() =>{
				this.count.current.textContent = --count;
			}, 1000);
		}else{
			clearInterval(this.countInterval);
			this.count.current.textContent = '0';
		}
	}
	toGenerateCards(){
		let arr = pictures.slice(0, Math.pow(this.props.density, 2) / 2);
		return arr.concat(arr).sort(() => Math.random() - Math.random());
	}
	render(){
		const arrayOfPictures = this.toGenerateCards();
		return(
			<div className='game-field-wrap'>
				<ul id='game-field' style = {{gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)`}} >
					{
						arrayOfPictures.map((i, n) => <Card key = {n} img = {i}/>)
					}
				</ul>
				<div className='count'>
					time left :
					<div ref = {this.count} id='count'> 0 </div>
				</div>
			</div>

)}}

export default connect(
	state => ({
		store: state,
		density: state.settings.density,
	})
)(Game);