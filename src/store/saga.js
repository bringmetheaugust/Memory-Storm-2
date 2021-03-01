import { takeEvery, takeLatest, select, put, delay, call } from 'redux-saga/effects';

import { resetGame } from '../actionCreators/common';
import { startCounter, setGameResult, setPicturesFetch } from '../actionCreators/gameState';
import { toggleAllCards, disableCard, setCards } from '../actionCreators/cards';

import { SET_GAME_ACTION, RESET_GAME, OPEN_CARD, SET_GAME_RESULT } from '../constants/actionTypes';
import { SETTINGS_SELECTOR, CARDS_SELECTOR, GAME_STATE_SELECTOR } from './selectors';

export function* rootSaga() {
    yield takeLatest(SET_GAME_ACTION, gameAction); // ? use { fork, cancel } to stop toggleAllCards(false)
    yield takeEvery(OPEN_CARD, openCard);
    yield takeEvery(SET_GAME_RESULT, gameResult);
    yield takeEvery(RESET_GAME, resetGameParams);
}

function* gameAction({ payload }) {
    const settings = yield select(SETTINGS_SELECTOR);

    if (payload) {
        localStorage.setItem('settings', JSON.stringify(settings));
        yield createCardsList();
        yield put(startCounter());
        yield put(toggleAllCards(true));
        yield delay(settings.hidingTime * 1000);
        yield put(toggleAllCards(false));
    } else {
        yield put(resetGame());
    }
}

function* createCardsList() {
	yield put(setPicturesFetch(true));

	const { density } = yield select(SETTINGS_SELECTOR);
	const cardArr = yield call(async () => {
        return await Promise.all([ ...new Array(Math.pow(density, 2) / 2) ].map(async () => {
			return await (await fetch(`https://picsum.photos/${600 / density}`)).url;
	    }));
    });

	const cards = [ ...cardArr, ...cardArr ].
		map(card => ({
			id: Math.floor(Math.random() * 100000000),
			img: card,
			isOpen: false,
			isDisable: false
		})).
		sort(() => Math.random() - Math.random());
		
	yield put(setCards(cards));
	yield put(setPicturesFetch(false));
};


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
