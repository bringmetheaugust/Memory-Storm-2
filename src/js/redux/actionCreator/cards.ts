// @ts-ignore
import { endGame } from './index.ts';
// @ts-ignore
import * as AT from '../actionType/index.ts';
// @ts-ignore
import Card from '../interface/card.ts';
const cardHiddingTime = 500;

export const openCard = (id: number) => ({
	type: AT.OPEN_CARD,
	payload: id
});

export const disableCard = (id: number) => ({
	type: AT.DISABLE_CARD,
	payload: id
});

export const openAllCards = (bool: boolean) => ({
	type: AT.OPEN_ALL_CARDS,
	payload: bool
});

export const disactiveAllCards = () => ({
	type: AT.DISACTIVE_ALL_CARDS
});

export const closeAllCards = () => (dispatch: any) => {
	dispatch(disactiveAllCards());
	setTimeout(() => dispatch(openAllCards(false)), cardHiddingTime);
};

export const activateCard = (id: number) => (dispatch: any, getState: any) => {
	dispatch(openCard(id));
	const openedCards = getState().cards.filter((i: Card) => (i.isOpen && !i.isDisable) === true);
	if (openedCards.length > 1) {
		if (openedCards[0].img === openedCards[1].img) {
			openedCards.forEach((i: Card) => dispatch(disableCard(i.id)));
			if (getState().cards.every((i: Card) => i.isDisable === true)) return dispatch(endGame(true));
		}
	dispatch(closeAllCards());
	}
};