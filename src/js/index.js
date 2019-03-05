import '../style/index.sass';
import '../html/index.pug';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './react/App.jsx';
import {store} from './redux/index.js';

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);