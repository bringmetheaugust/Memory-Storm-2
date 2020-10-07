import { SET_CARDS, OPEN_CARD, DISABLE_CARD, TOGGLE_ALL_CARDS }from '../constants/actionTypes';
import CARD_IMAGES from '../media/cards/index';

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

export const createCardsList = () => (dispatch, getState) => {
	const { density } = getState().settings;
	const temporaryArr = CARD_IMAGES.
		sort(() => Math.random() - Math.random()).
		slice(0, Math.pow((density), 2) / 2);

	const cards = ([ ...temporaryArr, ...temporaryArr ].
		map(card => ({
			id: Math.floor(Math.random() * 100000000),
			img: card,
			isOpen: false,
			isDisable: false
		}))).
		sort(() => Math.random() - Math.random());
		
	dispatch(setCards(cards));
};
