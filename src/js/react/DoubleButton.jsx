import React from 'react';
import PropTypes from 'prop-types';

const DoubleButton = (props) =>
	<div onClick={props.event ? () => props.event() : null}
		className={`button ${props.play? 'abort' : ''}`}
	>
		<ul className='play'>
			{props.firstBlock.split('').map(i => <li key={Math.random()}>{i}</li>)}
		</ul>
		<ul className='abort'>
			{props.secondBlock.split('').map(i => <li key={Math.random()}>{i}</li>)}
		</ul>
	</div>

DoubleButton.propTypes = {
	event: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool
	])
};

export default DoubleButton;