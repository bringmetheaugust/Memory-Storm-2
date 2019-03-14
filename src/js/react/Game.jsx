import React from 'react';
import Card from './Card.jsx';
import {connect} from 'react-redux';
import pictures from '../pictures.js';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.count = React.createRef();
	}
	shouldComponentUpdate(nextPr){
		if(this.props.store.play != nextPr.store.play) return true;
		return false;
	}
	componentWillReceiveProps(pr){
		pr.store.play ? this.runCount(pr.store.settings.time) : this.stopCount();
	}
	runCount = (time) =>{
		this.countInterval = setInterval(() =>{
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
				<ul id='game-field'
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
	})
)(Game);