import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import './style/index.sass';
import './index.pug';
import App from './App.jsx';
import { store } from './store/index';

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
