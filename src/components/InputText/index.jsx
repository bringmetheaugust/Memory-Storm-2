import React, { memo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import css from './index.module.sass';
import { GAME_STATE_SELECTOR } from '../../store/selectors';

const InputText = ({ handleChange, label, id, val, error, errorText, classNames }) => {
    const { play } = useSelector(GAME_STATE_SELECTOR);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = val;
    }, [val]);

    return (
        <label className={`${css.index} ${ error && css['with-error'] } ${classNames}`}>
            {label}
            <input
                onChange={e => handleChange(id, e.target.value)}
                ref={inputRef}
                key={id}
                id={id}
                type='number'
                defaultValue={val}
                readOnly={play}
            />
            <div className={css.error}>{ error && errorText }</div>
        </label>
    );
};

InputText.defaultProps = { classNames: '' };

export default memo(InputText);
