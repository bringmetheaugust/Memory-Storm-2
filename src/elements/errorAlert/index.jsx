import React from 'react';

import css from './index.module.sass';

const errorAlert = (
    <div className={css.index}>
        <div>Oops...</div>
        <div>Something gonna wrong!</div>
        <div>Please, try again later!</div>
    </div>
);

export default errorAlert;
