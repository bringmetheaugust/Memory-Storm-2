import React from 'react';
import { connect } from 'react-redux';
import DoubleButton from '../DoubleButton/index';
import StateInterface from '../../interface/InitialState';

interface Props {
	win: boolean
}

interface State {
	isHiden: boolean
}

class Alert extends React.Component<Props, State> {
	constructor (props: Props) {
		super(props);
		this.state = { isHiden: false };
	}
	static getDerivedStateFromProps = (nextPr: Props) => nextPr.win === null ? { isHiden: false } : null;
	render() {
		if (this.props.win === null || this.state.isHiden) return null;
		return(
			<div id='alert'>
				<div className='title'>you {this.props.win ? 'win!!!' : 'lose :('}</div>
				<DoubleButton firstBlock='back' secondBlock='' event={() => this.setState({ isHiden: true })} />
			</div>
		)
	}
}

export default connect(
	(state: StateInterface) => ({ win: state.gameState.win }),
)(Alert);