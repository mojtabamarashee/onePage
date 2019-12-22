import React from 'react';
import ReactDOM from 'react-dom';
import {Settings, filters} from './Setting.jsx';
import {Table, table} from './Table.jsx';

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
			$.fn.dataTable.ext.search = filters.filter(v => v.exist).map((v => v.func));
			this.setState({mode: 'table'}, () => table.draw());
		}
	};

	render() {
		let styleSettings, styleT, out, settingStyle, tableStyle;
		console.log('mode = ', this.state.mode);
		if (table) table.draw();
		this.state.mode == 'table'
			? ((settingStyle = {display: 'none'}), (tableStyle = {display: 'block'}))
			: ((tableStyle = {display: 'none'}), (settingStyle = {display: 'block'}));
		return (
			<div>
				<div style={tableStyle}>
					<Table ChangeMode={this.ChangeMode} />
				</div>
				<div style={settingStyle}>
					<Settings ChangeMode={this.ChangeMode} />
				</div>
			</div>
		);
	}
}
export {Main};
