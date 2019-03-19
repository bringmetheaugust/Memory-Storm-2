const MIN_GAME_TIME = 10, MAX_GAME_TIME = 60;
const MIN_HIDING_TIME = 1, MAX_HIDING_TIME = 10;
const MIN_DENSITY= 2, MAX_DENSITY = 6;
const initialState = {
	density: 4,
	hiding: 5,
	time: 60
};

const getLocalStorage = () => validateForm(JSON.parse(localStorage.getItem('settings'))) || initialState;

const validateForm = (obj) =>{
	if (!obj) return;
	for (var i in obj){
		if (typeof obj[i] !== 'number' || Number.isNaN(obj[i]) ) return;
	}
	if ((obj.density < MIN_DENSITY || obj.density > MAX_DENSITY || obj.density % 2) ||
		(obj.hiding < MIN_HIDING_TIME || obj.hiding > MAX_HIDING_TIME) ||
		(obj.time < MIN_GAME_TIME || obj.time > MAX_GAME_TIME)) return;
	return obj;
}

export default function settings(state = getLocalStorage(), action){
	if (action.type === 'setSettings'){
		localStorage.setItem('settings', JSON.stringify(action.data))
		return action.data;
	}
	return state;
}