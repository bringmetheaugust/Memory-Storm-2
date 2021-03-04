import {
	SET_CARDS, OPEN_CARD, DISABLE_CARD, TOGGLE_ALL_CARDS, SET_FAKE_CARDS
} from '../constants/actionTypes';

export const setCards = cards => ({
	type: SET_CARDS,
	payload: cards
});

export const openCard = id => ({
	type: OPEN_CARD,
	payload: id
});

export const disableCard = id => ({
	type: DISABLE_CARD,
	payload: id
});

export const toggleAllCards = bool => ({
	type: TOGGLE_ALL_CARDS,
	payload: bool
});

export const setFakeCards = () => ({ type: SET_FAKE_CARDS });
