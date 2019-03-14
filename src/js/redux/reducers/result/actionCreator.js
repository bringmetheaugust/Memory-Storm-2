export const setGameResultCounter = (score) => ({
	type: 'setResult',
	data: score
});

export const  decrementScore = () => ({
	type: 'decrement'
});