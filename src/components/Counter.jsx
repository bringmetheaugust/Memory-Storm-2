import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { GAME_STATE_SELECTOR } from '../store/selectors';

const Counter = () => {
    const { counter } = useSelector(GAME_STATE_SELECTOR);

    return (
        <div className='count'>
            time left :
            <div className={`counter ${ counter > 0 && counter < 6 && 'low-count' }`} >
                {counter}
            </div>
        </div>
    );
};

export default memo(Counter);
