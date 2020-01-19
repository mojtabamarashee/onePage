import React from 'react';
import ReactDOM from 'react-dom';
class SymbolPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<span
					style={{
						fontFamily: 'Courier New, Courier, monospace',
						float: 'right',
						fontWeight: 'bold',
					}}>
					{this.props.v.l30}
				</span>
			</div>
		);
	}
}

export {SymbolPage};
