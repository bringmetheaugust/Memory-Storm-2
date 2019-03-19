import React from 'react';
import Card from './Card.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';
import {setGameAction} from '../redux/reducers/gameState/actionCreator.js';

class Game extends React.Component{
	constructor(props){
		super(props);
	}
	shouldComponentUpdate = (nextPr) => this.props.play !== nextPr.play ? true : false;
	componentWillUpdate = (nextPr) => nextPr.play ? this.runCount(nextPr.store.settings.time) : this.stopCount();
	runCount = (time) =>{
		this.countInterval = setInterval(() =>{
			if (time === 1) {
				this.props.setGameAction(false);
				this.stopCount();
			}
			this.count.textContent = --time;
		}, 1000);
	}
	stopCount = () =>{
		clearInterval(this.countInterval);
		this.count.textContent = '0';
	}
	toGenerateCards = () =>{
		let arr = pictures.slice(0, Math.pow(this.props.density, 2) / 2);
		return arr.concat(arr).sort(() => Math.random() - Math.random());
	}
	render(){
		return(
			<div className='game-field-wrap'>
				<ul id='game-field' className = {this.props.play? 'play' : ''}
					style = {{gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)`}} >
					{
						this.toGenerateCards().map((i, n) => <Card key = {Math.random()} img = {i}/>)
					}
				</ul>
				<div className='count'>time left :
					<div ref = {i => this.count = i} id='count'> 0 </div>
				</div>
			</div>

)}}

export default connect(
	state => ({
		store: state,
		density: state.settings.density,
		play: state.gameState.play,
	}),
	dispatch => ({ setGameAction: (bool) => dispatch(setGameAction(bool)) })
)(Game);