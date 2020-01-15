import React from 'react';
import ReactDOM from 'react-dom';
class Swing extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let minP, maxP, min, max;
		({minP, maxP, min, max} = this.props.data);
		return (
			<div style={{width: '100%', height: '5px'}}>
				<div
					style={{
						margin: ((minP - min) / (max - min)) * 100 + '%',
						backgroundColor: 'red',
						width: minP < 0 ? (((maxP - minP) / (max - min)) * 100 + '%') : '0px',
						height: '100%',
					}}
				/>
			</div>
		);
	}
}

export {Swing};
