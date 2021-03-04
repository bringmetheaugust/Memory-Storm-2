import { takeEvery, takeLatest, select, put, delay, call, all, fork, cancel } from 'redux-saga/effects';

import { setCounter, setGameResult, setPicturesFetch } from '../actionCreators/gameState';
import { toggleAllCards, disableCard, setCards } from '../actionCreators/cards';

import { START_GAME, STOP_GAME, RESET_GAME, OPEN_CARD, SET_GAME_RESULT } from '../constants/actionTypes';
import { SETTINGS_SELECTOR, CARDS_SELECTOR, GAME_STATE_SELECTOR } from './selectors';

class Card {
    constructor(cardImg) {
        this.id = Math.floor(Math.random() * 100000000);
        this.img = cardImg;
        this.isOpen = false;
        this.isDisable = false;
    }
}

const getRandomImage = async density => await (await fetch(`https://picsum.photos/${600 / density}`)).url;

export function* rootSaga() {
    yield takeLatest(START_GAME, startGameWorker);
    yield takeEvery(OPEN_CARD, openCardWorker);
    yield takeEvery(SET_GAME_RESULT, stopGameWorker);
    yield takeLatest(STOP_GAME, stopGameWorker);
    yield takeEvery(RESET_GAME, function*() {
        yield put(toggleAllCards(false));
    });
}

// start decrementing counter when the game has been started
function* counter(counterTime) {
    yield put(setCounter(counterTime));

    while(true) {
        yield delay(1000);
        yield put(setCounter());

        const { counter } = yield select(GAME_STATE_SELECTOR);

        if (counter <= 0) {
            yield put(setGameResult(false));
            break;
        }
    }
}

function* createCardsList() {
	yield put(setPicturesFetch(true));

	const { density } = yield select(SETTINGS_SELECTOR);
	const cardArr = yield call(async () => await Promise.all(
        [ ...new Array(Math.pow(density, 2) / 2) ].map(async () => await getRandomImage(density))
    ));

	const cards = [ ...cardArr, ...cardArr ].
		map(card => new Card(card)).
		sort(() => Math.random() - Math.random());
		
	yield put(setCards(cards));
	yield put(setPicturesFetch(false));
};

// toogle cards when game has been started
function* showCards(hidingTime) {
    yield put(toggleAllCards(true));
    yield delay(hidingTime * 1000);
    yield put(toggleAllCards(false));
}

// saga's workers

let forkedCounter, forkedToggleCards;

function* startGameWorker() {
    const settings = yield select(SETTINGS_SELECTOR);

    localStorage.setItem('settings', JSON.stringify(settings));
    
    yield createCardsList();
    forkedCounter = yield fork(counter, settings.time);
    forkedToggleCards = yield fork(showCards, settings.hidingTime);
}

function* openCardWorker() {
    const cards = yield select(CARDS_SELECTOR);
    const openedCards = cards.filter(({ isOpen, isDisable }) => isOpen && !isDisable);

    if (openedCards.length > 1) {
        const [ card1, card2 ] = openedCards;

		if (card1.img === card2.img) {
            yield all([ put(disableCard(card1.id)), put(disableCard(card2.id)) ]);
            
            const updatedCards = yield select(CARDS_SELECTOR);

            if (updatedCards.every(({ isDisable }) => isDisable)) return yield put(setGameResult(true));
		}

        yield delay(500);
		yield put(toggleAllCards(false));
	}
}

function* stopGameWorker() {
    yield all([
        cancel(forkedCounter),
        cancel(forkedToggleCards)
    ]);
}
