export const addItemOnBuffer = (item) => ({
	type: 'addItem',
	data: item
});

export const setGameResultScore = (score) => ({
	type: 'setScore',
	data: score
});

export const clearBuffer = () => ({ type: 'clear' });