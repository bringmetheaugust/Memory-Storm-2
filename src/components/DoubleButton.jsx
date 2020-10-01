import React, { memo } from 'react';

const DoubleButton = ({ event, play, firstBlock, secondBlock }) => (
	<div
		onClick={ event ? () => event() : null }
		className={`button ${ play ? 'abort' : '' }`}
	>
		<ul className='play'>
			{ firstBlock.split('').map(letter => <li key={Math.random()}>{letter}</li>) }
		</ul>
		<ul className='abort'>
			{ secondBlock.split('').map(letter => <li key={Math.random()}>{letter}</li>) }
		</ul>
	</div>
);

export default memo(DoubleButton);
