import React from 'react';
import ReactDOM from 'react-dom';
import {Settings} from './Setting.jsx';
import {Table} from './Table.jsx';
import {App2} from './Test.js';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'table',
		};
	}

	ChangeMode = mode => {
		if (mode == 'table') {
			this.setState({mode: 'settings'});
		} else {
			this.setState({mode: 'table'});
		}
	};

	render() {
		let styleSettings, styleTable;
		let out = this.state.mode == 'table' ? <App2 /> : <Settings ChangeMode={this.ChangeMode} />;
		return out;
	}
}
export {Main};
