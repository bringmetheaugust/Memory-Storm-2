import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { endGame } from '../actionCreators/index';
import { GAME_STATE_SELECTOR } from '../store/selectors';

const Counter = () => {
    const { counter, play } = useSelector(GAME_STATE_SELECTOR);
    const dispatch = useDispatch();

    useEffect(() => {
        if (play && counter <= 0) dispatch(endGame(false));
    }, [counter]);

    return (
        <div className='count'>
            time left :
            <div id='count'>{counter}</div>
        </div>
    );
};

export default memo(Counter);
