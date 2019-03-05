const initialState = {
	density: 4,
	hiding: 5,
	time: 60
};

const getLocalStorage = () =>
	JSON.parse(localStorage.getItem('settings')) || initialState

export default function settings(state = getLocalStorage(), action){
	if(action.type === 'setSettings') return action.data
	return state
}