import React from 'react';

class Splash extends React.Component{
	constructor(props){
		super(props);
		this.state = { isActive: true };
	}
	hideSplash = () =>{
		if(this.splash) this.splash.style.opacity = '0';
		setTimeout(() => this.setState({ isActive: false }), 1000);
	}
	componentDidMount = () => this.count = setTimeout(() => this.hideSplash() , 13000);
	componentWillUnmount = () => clearTimeout(this.count);
	render(){
		if(!this.state.isActive) return null;
		return(
			<div id = 'splash' ref ={i => this.splash = i}>
				<div className = 'title'>
					MEMORY STORM
					<div className = 'exclamation'>
						work hard , play hard
						<div>!</div>
					</div>
				</div>
				<div className = 'splash-wrap'>
					{
						[...new Array(100)].map((i, n) => <div className = 'splash' key = {n}></div>)
					}
				</div>
				<div onClick = {this.hideSplash} id = 'close'>close</div>
			</div>
		)
	}
}

export default Splash;