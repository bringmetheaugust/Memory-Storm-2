// @ts-ignore
import Card from './card.ts';

export default interface State {
	settings: {
		density: number
		hiding: number
		time: number
	}
	cards: []|Card
	gameState: {
		play: boolean
		counter: number
		win: null|boolean
	}
}