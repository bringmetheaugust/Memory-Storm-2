import React from 'react';

export default class Settings extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<form id='settings'>
				<label>select grid density
					<input type='number'/>
				</label>
				<label>select time for pictures hiding (sec)
					<input type='number'/>
				</label>
				<label>select game time (sec)
					<input type='number'/>
				</label>
				<button>
					<div className='play'>
						<div>p</div>
						<div>l</div>
						<div>a</div>
						<div>y</div>
					</div>
					<div className='abort'>
						<div>s</div>
						<div>t</div>
						<div>o</div>
						<div>p</div>
					</div>
				</button>
			</form>
		)
	}
}