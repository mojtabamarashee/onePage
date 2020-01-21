import React from 'react';
import ReactDOM from 'react-dom';
import {Filter, filters} from './Filter.jsx';
import {Header} from './Header.jsx';
import {Help} from './Help.jsx';
import {Setting} from './Settings.jsx';
import {Table, table} from './Table.jsx';

let filterStyle, tableStyle, helpStyle, settingStyle;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'table',
			filtersEn: 1,
		};
	}

	ChangeMode = mode => {
		if (mode == 'table') {
			if (this.state.filtersEn) {
				$.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
			}
			this.setState({mode: mode}, () => table.draw());
		} else if (mode == 'filter') {
			this.setState({mode: mode});
		} else if (mode == 'help') {
			this.setState({mode: mode});
		} else if (mode == 'setting') {
			this.setState({mode: mode}, () => console.log(mode));
		}
	};

	SetStyles = mode => {
		filterStyle = {display: 'none'};
		tableStyle = {display: 'none'};
		helpStyle = {display: 'none'};
		settingStyle = {display: 'none'};
		if (mode == 'table') {
			tableStyle = {display: 'block'};
		} else if (mode == 'filter') {
			filterStyle = {display: 'block'};
		} else if (mode == 'help') {
			helpStyle = {display: 'block'};
		} else if (mode == 'setting') {
			settingStyle = {display: 'block'};
		}
	};

	DisableFilters = () => {
		$.fn.dataTable.ext.search = [];
		this.setState({filtersEn: 0});
		table.draw();
	};

	EnableFilters = () => {
		$.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
		this.setState({filtersEn: 1});
		table.draw();
	};

	render() {
		if (table) table.draw();
		this.SetStyles(this.state.mode);
		return (
			<div>
				<div style={tableStyle}>
					<Header
						ChangeMode={this.ChangeMode}
						DisableFilters={this.DisableFilters}
						EnableFilters={this.EnableFilters}
						badge={this.state.filtersEn ? filters.filter(v => v.exist).length : 0}
						filtersEn={this.state.filtersEn}
					/>
					<Table />
				</div>
				<div style={filterStyle}>
					<Filter ChangeMode={this.ChangeMode} />
				</div>
				<div style={helpStyle}>
					<Help ChangeMode={this.ChangeMode} />
				</div>
				<div style={settingStyle}>
					<Setting ChangeMode={this.ChangeMode} />
				</div>
			</div>
		);
	}
}
export {Main};
