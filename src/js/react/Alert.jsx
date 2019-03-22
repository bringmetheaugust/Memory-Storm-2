import React from 'react';
import {connect} from 'react-redux';

const Alert = (props) =>{
	return(
		<div id='alert'>
			<div className='title'>
			</div>
			<div className = 'button'>
				<div>b</div>
				<div>a</div>
				<div>c</div>
				<div>k</div>
			</div>
		</div>
	)
}

export default connect(
	state => ({ store: state }),
)(Alert);