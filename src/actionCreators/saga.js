import { all, takeEvery, takeLatest, select, put, delay, take } from 'redux-saga/effects';

import { resetGame } from './common';
import { startCounter, setGameResult } from './gameState';
import { toggleAllCards, createCardsList, disableCard } from './cards';

import { SET_GAME_ACTION, RESET_GAME, OPEN_CARD, SET_GAME_RESULT, SET_CARDS } from '../constants/actionTypes';
import { SETTINGS_SELECTOR, CARDS_SELECTOR, GAME_STATE_SELECTOR } from '../store/selectors';

export function* rootSaga() {
    yield all([
        takeLatest(SET_GAME_ACTION, gameAction), // ? use { fork, cancel } to stop toggleAllCards(false)
        takeEvery(OPEN_CARD, openCard),
        takeEvery(SET_GAME_RESULT, gameResult),
        takeEvery(RESET_GAME, resetGameParams)
    ]);
}

function* gameAction({ type, payload }) {
    const settings = yield select(SETTINGS_SELECTOR);

    if (payload) {
        localStorage.setItem('settings', JSON.stringify(settings));
        yield put(createCardsList());
        yield take(SET_CARDS); // ! better use { call } for async actions
        yield put(startCounter());
        yield put(toggleAllCards(true));
        yield delay(settings.hidingTime * 1000);
        yield put(toggleAllCards(false));
    } else {
        yield put(resetGame());
    }
}

function* openCard() {
    const cards = yield select(CARDS_SELECTOR);
    const openedCards = cards.filter(card => (card.isOpen && !card.isDisable) === true);

    if (openedCards.length > 1) {
		if (openedCards[0].img === openedCards[1].img) {
            yield put(disableCard(openedCards[0].id));
            yield put(disableCard(openedCards[1].id));
            
            const updatedCards = yield select(CARDS_SELECTOR);

            if (updatedCards.every(card => card.isDisable === true))
                return yield put(setGameResult(true));
		}

        yield delay(500);
		yield put(toggleAllCards(false));
	}
}

function* gameResult() {
    yield put(resetGame());
}

function* resetGameParams() {
    const { counterId } = yield select(GAME_STATE_SELECTOR);

    clearInterval(counterId);
    yield put(toggleAllCards(false));
}
