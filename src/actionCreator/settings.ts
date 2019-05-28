import * as AT from '../actionType/index';
import pictures from '../img/index';
import State from '../interface/InitialState';
import Card from '../interface/Card';

export const setGameSettings = (settings: State.settings) => ({
	type: AT.SET_GAME_SETTINGS,
	payload: settings
});

export const setCards = (cards: Card[]) => ({
	type: AT.SET_CARDS,
	payload: cards
});

export const createCardsList = (val: number|null) => (dispatch: any, getState: any) => {
	const temporaryArr = pictures.sort(() => Math.random() - Math.random()).
		slice(0, Math.pow((val || getState().settings.density), 2) / 2);
	const cards = ([...temporaryArr, ...temporaryArr].map(i => ({
		id: String(Math.random()).slice(2, 12),
		img: i,
		isOpen: false,
		isDisable: false,
		isActive: false
	}))).sort(() => Math.random() - Math.random());
	dispatch(setCards(cards));
};

export const combinedSettings = (settings: State.settings) => (dispatch: any) => {
	dispatch(setGameSettings(settings));
	dispatch(createCardsList(null));
};