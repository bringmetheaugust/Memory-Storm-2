import React from 'react';

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

export default DoubleButton;