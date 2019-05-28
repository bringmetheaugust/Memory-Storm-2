import './style/index.sass';
import './html/index.pug';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './component/App';
import { store } from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>,
	document.getElementById('root')
);