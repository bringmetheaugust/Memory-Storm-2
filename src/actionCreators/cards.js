import { endGame } from './index.js';
import * as AT from '../constants/actionTypes';

export const openCard = id => ({
	type: AT.OPEN_CARD,
	payload: id
});

export const disableCard = id => ({
	type: AT.DISABLE_CARD,
	payload: id
});

export const openAllCards = bool => ({
	type: AT.OPEN_ALL_CARDS,
	payload: bool
});

export const disactiveAllCards = () => ({
	type: AT.DISACTIVE_ALL_CARDS
});

export const closeAllCards = () => dispatch => {
	dispatch(disactiveAllCards());
	setTimeout(() => dispatch(openAllCards(false)), 500);
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
