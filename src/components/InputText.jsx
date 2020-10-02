import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { GAME_STATE_SELECTOR } from '../store/selectors';

const InputText = ({ handleChange, label, id, val, error, errorText }) => {
    const { play } = useSelector(GAME_STATE_SELECTOR);

    return (
        <label>
            {label}
            <input
                onChange={handleChange}
                key={id}
                id={id}
                type='number'
                defaultValue={val}
                readOnly={play}
            />
            <div className='error'>{ error ? errorText : '' }</div>
        </label>
    );
};

export default memo(InputText);
