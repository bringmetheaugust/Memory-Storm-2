import React from 'react';
import { connect } from 'react-redux';
import DoubleButton from './DoubleButton.jsx';

class Alert extends React.Component {
	constructor (props) {
		super(props);
		this.state = { isHiden: false };
	}
	static getDerivedStateFromProps = (nextPr) => nextPr.win === null ? { isHiden: false } : null;
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
	state => ({ win: state.gameState.win }),
)(Alert);