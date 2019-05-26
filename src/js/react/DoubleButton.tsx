import React from 'react';

interface Props {
	event: any
	play: boolean
	firstBlock: string
	secondBlock: string
}

const DoubleButton = (props: Props) =>
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