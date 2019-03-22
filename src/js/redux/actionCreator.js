export const setCards = (cards) => ({
	type: 'SET_CARDS',
	data: cards
});

export const setGameAction = (bool) => ({
	type: 'SET_GAME_ACTION',
	data: bool
});

export const openCard = (id) => ({
	type: 'OPEN_CARD',
	data: id
});

export const openAllCards = (bool) => ({
	type: 'OPEN_ALL_CARDS',
	data: bool
});

// export const setGameSettings = (settings) => ({
// 	type: 'setSettings',
// 	data: settings
// });