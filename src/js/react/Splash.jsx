import React from 'react';
const SPLASH_TIME = 13000;
const SPLASH_HIDDING_TIME = 1000;

class Splash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: true,
			isHidden: false
		};
	}
	hideSplash = () => {
		if (this.splash) this.setState({ isHidden: true });
		setTimeout(() => this.setState({ isActive: false }), SPLASH_HIDDING_TIME);
	}
	componentDidMount = () => this.count = setTimeout(() => this.hideSplash() , SPLASH_TIME);
	componentWillUnmount = () => clearTimeout(this.count);
	render() {
		if (!this.state.isActive) return null;
		return(
			<div id='splash' ref ={i => this.splash = i} style={{ opacity: this.state.isHidden ? 0 : 1 }}>
				<div className='title'>MEMORY STORM
					<div className='exclamation'>work hard , play hard
						<div>!</div>
					</div>
				</div>
				<div className='splash-wrap'>
					{[...new Array(100)].map((i, n) => <div className='splash' key={n}></div>)}
				</div>
				<div onClick={this.hideSplash} id='close'>close</div>
			</div>
		)
	}
}

export default Splash;