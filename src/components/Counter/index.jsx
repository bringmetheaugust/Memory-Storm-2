import React from 'react';
import { useSelector } from 'react-redux';

import css from './index.module.sass';

import { COUNTER_WARNING } from '../../constants/gameSettings';
import { GAME_STATE_SELECTOR } from '../../store/selectors';

const Counter = () => {
    const { counter } = useSelector(GAME_STATE_SELECTOR);
    const withWarning = counter > 0 && counter <= COUNTER_WARNING;

    return (
        <div className={css.index}>
            time left :
            <div className={`${css.counter} ${ withWarning && css.warning }`} >
                {counter}
            </div>
        </div>
    );
};

export default Counter;
