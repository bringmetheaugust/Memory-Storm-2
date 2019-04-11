import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Counter = props =>
	<div className='count'>time left :
		<div id='count'>{props.counterTime}</div>
	</div>
	
Counter.propTypes = { counterTime: PropTypes.number };

export default connect(
	state => ({ counterTime: state.gameState.counter })
)(Counter);