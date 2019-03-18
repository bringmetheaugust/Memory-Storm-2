import React from 'react';
import Card from './Card.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';
import {setGameAction} from '../redux/reducers/gameState/actionCreator.js';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.count = React.createRef();
	}
	shouldComponentUpdate(nextPr){
		if(this.props.store.gameState !== nextPr.store.gameState) return true;
		return false;
	}
	componentWillUpdate(nextPr){
		nextPr.store.gameState ? this.runCount(nextPr.store.settings.time) : this.stopCount();
	}
	runCount = (time) =>{
		this.countInterval = setInterval(() =>{
			if(time === 1){
				this.props.setGameAction();
				this.stopCount();
			}
			this.count.current.textContent = --time;
		}, 1000);
	}
	stopCount = () =>{
		clearInterval(this.countInterval);
		this.count.current.textContent = '0';
	}
	toGenerateCards = () =>{
		let arr = pictures.slice(0, Math.pow(this.props.density, 2) / 2);
		return arr.concat(arr).sort(() => Math.random() - Math.random());
	}
	render(){
		return(
			<div className='game-field-wrap'>
				<ul id='game-field' className = {this.props.store.gameState ? 'play' : ''}
					style = {{gridTemplate : `repeat(${this.props.density}, 1fr)/repeat(${this.props.density}, 1fr)`}} >
					{
						this.toGenerateCards().map((i, n) => <Card key = {Math.random()} img = {i}/>)
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
	}),
	dispatch => ({
		setGameAction: () => dispatch(setGameAction()),
	})
)(Game);