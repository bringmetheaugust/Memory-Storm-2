import { all, takeEvery, select, put, delay } from 'redux-saga/effects';

import { resetGame } from './index';
import { setCounter, setGameResult } from './gameState';
import { toggleAllCards, createCardsList, disableCard } from './cards';
import { SET_GAME_ACTION, RESET_GAME, OPEN_CARD } from '../constants/actionTypes';
import { SETTINGS_SELECTOR, CARDS_SELECTOR } from '../store/selectors';

export function* rootSaga() {
    yield all([
        takeEvery(SET_GAME_ACTION, gameAction),
        takeEvery(OPEN_CARD, openCard),
        takeEvery(RESET_GAME, resetGameParams)
    ]);
}

function* gameAction({ type, payload }) {
    const settings = yield select(SETTINGS_SELECTOR);

    switch (payload) {
        case true: {
            localStorage.setItem('settings', JSON.stringify(settings));
            yield put(setCounter(settings.time));
            yield put(toggleAllCards(true));
            yield delay(settings.hiding * 1000);
            yield put(toggleAllCards(false));
            break;
        }

        case false: {
            yield put(setGameResult(false));
            yield put(resetGame());
            break;
        }

        case null: {
            yield put(resetGame());
            break;
        }
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

function* resetGameParams() {
    yield put(toggleAllCards(false));
    yield delay(500);
    yield put(createCardsList());
}
