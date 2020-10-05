import { all, takeEvery, select, put, delay } from 'redux-saga/effects';

import { resetGame } from './index';
import { setCounter } from './gameState';
import { toggleAllCards } from './cards';
import { SET_GAME_ACTION, RESET_GAME } from '../constants/actionTypes';
import { SETTINGS_SELECTOR } from '../store/selectors';

export function* rootSaga() {
    yield all([
        takeEvery(SET_GAME_ACTION, gameAction),
        takeEvery(RESET_GAME, lol)
    ]);
}

function* gameAction({ type, payload }) {
    const { time, hiding } = yield select(SETTINGS_SELECTOR);

    switch (payload) {
        case true: {
            yield put(setCounter(time));
            yield put(toggleAllCards(true));
            yield delay(hiding * 1000);
            yield put(toggleAllCards(false));
            break;
        }

        case null: {
            yield put(resetGame());
            break;
        }
    }
}

function* lol() {
    yield put(toggleAllCards(false));
}
