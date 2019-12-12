import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {curRows, tableThis, table} from './Table.jsx';
class Settings extends React.Component {
	PEPos = () => e => {
		var Fucn = function(settings, data, dataIndex) {
			var pe = parseFloat(data[1]) || 0;
			if (pe > 0) {
				return true;
			}
			return false;
		};

		if (e.target.checked) {
			$.fn.dataTable.ext.search.push(Func);
		} else {
			$.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(Func, 1));
		}
	};

	PESmallerThanSec = () => e => {
		//tableThis.setState({PESmallerThanSecFlag: e.target.checked}, () => console.log('state = ', tableThis.state));
		var Func = function(settings, data, dataIndex) {
			var pe = parseFloat(data[1]) || 0;
			var secPe = parseFloat(data[2]) || 0;
			if (pe < secPe) {
				return true;
			}
			return false;
		};

		if (e.target.checked) {
			$.fn.dataTable.ext.search.push(Func);
		} else {
			$.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(Func, 1));
		}
	};

	PESmallerThanHalfSec = () => e => {
		var Func = function(settings, data, dataIndex) {
			var pe = parseFloat(data[1]) || 0;
			var secPe = parseFloat(data[2]) || 0;
			if (pe < 0.5 * secPe) {
				return true;
			}
			return false;
		};

		if (e.target.checked) {
			$.fn.dataTable.ext.search.push(Func);
		} else {
			$.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(Func, 1));
		}
	};

	RsiLessThan = () => e => {
		var Func = function(settings, data, dataIndex) {
			var rsi = parseFloat(data[4]) || 0;
			if (rsi < 45) {
				return true;
			}
			return false;
		};

		if (e.target.checked) {
			$.fn.dataTable.ext.search.push(Func);
		} else {
			$.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(Func, 1));
		}
	};
	render() {
		return (
			<div style={{margin: '5px'}}>
				<FontAwesomeIcon
					onClick={() => this.props.ChangeMode('settings')}
					icon={faLongArrowAltLeft}
					size="4x"
					color="black"
				/>
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
							onChange={this.PEPos()}
							value="gilad"
							inputProps={{
								'aria-label': 'secondary checkbox',
							}}
							color="primary"
						/>
					}
					label="P/E +"
				/>
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
							onChange={this.PESmallerThanSec()}
							value="gilad"
							inputProps={{
								'aria-label': 'secondary checkbox',
							}}
							color="primary"
						/>
					}
					label="P/E < SecPE"
				/>
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
							onChange={this.PESmallerThanHalfSec()}
							value="gilad"
							inputProps={{
								'aria-label': 'secondary checkbox',
							}}
							color="primary"
						/>
					}
					label="P/E < 0.5 * SecPE"
				/>
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
							onChange={this.RsiLessThan()}
							value="gilad"
							inputProps={{
								'aria-label': 'secondary checkbox',
							}}
							color="primary"
						/>
					}
					label="RSI < 45"
				/>
			</div>
		);
	}
}
export {Settings};
