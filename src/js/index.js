import '../style/index.sass';
import '../html/index.pug';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './react/App.jsx';
import {store} from './redux/index.js';
import {Provider} from 'react-redux';

ReactDOM.render(
	<Provider store = {store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);