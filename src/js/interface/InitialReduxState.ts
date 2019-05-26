export default interface State {
    settings: {
		density: number
		hiding: number
		time: number
	},
	cards: any
	gameState: {
		play: boolean
		counter: number
		win: null|boolean
	}
}