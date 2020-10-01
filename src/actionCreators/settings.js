import * as AT from '../constants/actionTypes';
import CARD_IMAGES from '../media/cards/index';

export const setGameSettings = settings => ({
	type: AT.SET_GAME_SETTINGS,
	payload: settings
});

export const setCards = cards => ({
	type: AT.SET_CARDS,
	payload: cards
});

export const createCardsList = val => (dispatch, getState) => {
	const temporaryArr = CARD_IMAGES.
		sort(() => Math.random() - Math.random()).
		slice(0, Math.pow((val || getState().settings.density), 2) / 2);

	const cards = ([...temporaryArr, ...temporaryArr].
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

export const combinedSettings = settings => dispatch => {
	dispatch(setGameSettings(settings));
	dispatch(createCardsList(null));
};
