import React from 'react';
import ReactDOM from 'react-dom';
class SymbolPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let v = this.props.v;
		return (
			<div>
				<span
					style={{
						fontFamily: 'Courier New, Courier, monospace',
						float: 'right',
						margin: '10px',
						fontWeight: 'bold',
						fontSize: '18px',
						color: 'blue',
					}}>
					{this.props.v.name}
				</span>
				<br />
				<br />
				<span
					style={{
						fontFamily: 'Courier New, Courier, monospace',
						margin: '10px',
						float: 'right',
						fontWeight: 'bold',
						fontSize: '14px',
					}}>
					{this.props.v.l30}
				</span>
			</div>
		);
	}
}

export {SymbolPage};
