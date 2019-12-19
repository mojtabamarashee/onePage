import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {curRows, tableThis, table} from './Table.jsx';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
let gFunc;
let selectedCs = 'none';

let cs = [
	0,
	1,
	10,
	11,
	13,
	14,
	17,
	19,
	20,
	21,
	22,
	23,
	25,
	26,
	27,
	28,
	29,
	31,
	32,
	34,
	38,
	39,
	40,
	42,
	43,
	44,
	45,
	46,
	47,
	49,
	50,
	53,
	54,
	55,
	56,
	57,
	58,
	60,
	61,
	64,
	65,
	66,
	67,
	68,
	69,
	70,
	71,
	72,
	73,
	90,
];
cs.forEach((v1, i1) => {
	let t = allRows.find((v, i) => v.l18.match(/^([^0-9]*)$/) && v.cs == v1);
	if (!t) {
		cs = cs.filter((v, i) => v != v1);
	}
});
cs.unshift('none');

class Settings extends React.Component {
	PEPos = () => e => {
		var Func = function(settings, data, dataIndex) {
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

	CsSelected = e => {
		selectedCs = e.target.value;
		if (gFunc) $.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(gFunc, 1));
		gFunc = function(settings, data, dataIndex) {
			var row = allRows.find(v => v.name == data[0]);
			if (row) {
				let css = row.cs;
				if (css == e.target.value) {
					return true;
				}
			}
			return false;
		};

		if (selectedCs != 'none') $.fn.dataTable.ext.search.push(gFunc);
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
				<br />
				<br />
				<TextField
					select
					label="Select"
					id="filled-select-currency"
					onChange={this.CsSelected}
					helperText="Please select cs"
					variant="filled">
					{cs.map(value => (
						<MenuItem key={value} value={value}>
							{value.toString() +
								' (' +
								allRows.filter((v, i) => v.l18.match(/^([^0-9]*)$/)).filter(v => v.cs == value).length + ")"
                            }
						</MenuItem>
					))}
				</TextField>
			</div>
		);
	}
}
export {Settings};
