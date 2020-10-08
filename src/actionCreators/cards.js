import { SET_CARDS, OPEN_CARD, DISABLE_CARD, TOGGLE_ALL_CARDS } from '../constants/actionTypes';

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

export const createCardsList = () => async (dispatch, getState) => {
	const { density } = getState().settings;
	const cardArr = await Promise.
		all([ ...new Array(Math.pow(density, 2) / 2)].
		map(async () => {
			const { url } = await fetch('https://picsum.photos/200');
			return url;
		}
	));

	const cards = [ ...cardArr, ...cardArr ].
		map(card => ({
			id: Math.floor(Math.random() * 100000000),
			img: card,
			isOpen: false,
			isDisable: false
		})).
		sort(() => Math.random() - Math.random());

		console.log(cards);
		
	dispatch(setCards(cards));
};
