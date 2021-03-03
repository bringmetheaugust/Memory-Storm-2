import React, { memo } from 'react';

import css from './index.module.sass';

const DoubleButton = ({ handleSubmit, isActive, firstBlock, secondBlock, classNames }) => (
	<div
		onClick={ handleSubmit ? () => handleSubmit() : null }
		className={`${css.index} ${ isActive && css.active } ${classNames}`}
	>
		<ul>
			{ firstBlock.split('').map(letter => <li key={Math.random()}>{letter}</li>) }
		</ul>
		{
			secondBlock &&
			(
				<ul className={css.second}>
					{ secondBlock.split('').map(letter => <li key={Math.random()}>{letter}</li>) }
				</ul>
			)
		}
	</div>
);

DoubleButton.defaultProps = { secondBlock: null, classNames: '' };

export default memo(DoubleButton);
