import { endGame } from './index.js';
import * as AT from '../constants/actionTypes';
import CARD_IMAGES from '../media/cards/index';

export const setCards = cards => ({
	type: AT.SET_CARDS,
	payload: cards
});

export const openCard = id => ({
	type: AT.OPEN_CARD,
	payload: id
});

export const disableCard = id => ({
	type: AT.DISABLE_CARD,
	payload: id
});

export const toggleAllCards = bool => ({
	type: AT.TOGGLE_ALL_CARDS,
	payload: bool
});

export const disactiveAllCards = () => ({
	type: AT.DISACTIVE_ALL_CARDS
});

export const closeAllCards = () => dispatch => {
	dispatch(disactiveAllCards());
	setTimeout(() => dispatch(toggleAllCards(false)), 500);
};

export const createCardsList = () => (dispatch, getState) => {
	const { density } = getState().settings;
	const temporaryArr = CARD_IMAGES.
		sort(() => Math.random() - Math.random()).
		slice(0, Math.pow((density), 2) / 2);

	const cards = ([ ...temporaryArr, ...temporaryArr ].
		map(card => ({
			id: String(Math.random()).slice(2, 12),
			img: card,
			isOpen: false,
			isDisable: false,
			isActive: false
		}))).
		sort(() => Math.random() - Math.random());
		
	dispatch(setCards(cards));
};

export const activateCard = id => (dispatch, getState) => {
	dispatch(openCard(id));

	const openedCards = getState().cards.filter(i => (i.isOpen && !i.isDisable) === true);

	if (openedCards.length > 1) {
		if (openedCards[0].img === openedCards[1].img) {
			openedCards.forEach(i => dispatch(disableCard(i.id)));
			
			if (getState().cards.every(i => i.isDisable === true)) return dispatch(endGame(true));
		}

		dispatch(closeAllCards());
	}
};
