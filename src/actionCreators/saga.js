import { takeLatest, all, takeEvery } from 'redux-saga/effects';

import { SET_GAME_ACTION } from '../constants/actionTypes';

export function* rootSaga() {
    yield all([
        // takeEvery(SET_GAME_ACTION, function* () { console.log('saga!!') })
    ]);
}
