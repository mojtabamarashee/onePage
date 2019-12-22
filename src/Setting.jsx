import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {curRows, tableThis, table} from './Table.jsx';
import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
let selectedCs = 'none';
let priceMinVal, priceMaxVal;
let filters = [];

filters.push({
	exist: 0,
	name: 'PEPos',
	func: (settings, data, dataIndex) => {
		var pe = parseFloat(data[2]) || 0;
		if (pe > 0) {
			return true;
		}
		return false;
	},
});

filters.push({
	exist: 0,
	name: 'PESmallerThanSec',
	func: (settings, data, dataIndex) => {
		var pe = parseFloat(data[2]) || 0;
		var secPe = parseFloat(data[3]) || 0;
		if (pe < secPe) {
			return true;
		}
		return false;
	},
});

filters.push({
	exist: 0,
	name: 'PESmallerThanHalfSec',
	func: (settings, data, dataIndex) => {
		var pe = parseFloat(data[2]) || 0;
		var secPe = parseFloat(data[3]) || 0;
		if (pe < 0.5 * secPe) {
			return true;
		}
		return false;
	},
});

filters.push({
	exist: 0,
	name: 'RsiLessThan',
	func: function(settings, data, dataIndex) {
		var rsi = parseFloat(data[8]) || 0;
		if (rsi < 45) {
			return true;
		}
		return false;
	},
});

filters.push({
	exist: 0,
	name: 'CsSelected',
	func: (settings, data, dataIndex) => {
		var row = allRows.find(v => v.name == data[0]);
		if (row) {
			let css = row.csName;
			if (css == selectedCs) {
				return true;
			}
		}
		return false;
	},
});

filters.push({
	exist: 0,
	name: 'PriceLimit',
	func: (settings, data, dataIndex) => {
		var p = parseFloat(data[1]) || 0;
		if (p < priceMaxVal && p > priceMinVal) {
			return true;
		}
		return false;
	},
});

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFilterEn: 0,
		};
	}

	PEPos = () => e => {
		if (e.target.checked) {
			filters.find(v => v.name == 'PEPos').exist = 1;
		} else {
			filters.find(v => v.name == 'PEPos').exist = 0;
		}
	};

	PESmallerThanSec = () => e => {
		if (e.target.checked) {
			filters.find(v => v.name == 'PESmallerThanSec').exist = 1;
		} else {
			filters.find(v => v.name == 'PESmallerThanSec').exist = 0;
		}
	};

	PESmallerThanHalfSec = () => e => {
		if (e.target.checked) {
			filters.find(v => v.name == 'PESmallerThanHalfSec').exist = 1;
		} else {
			filters.find(v => v.name == 'PESmallerThanHalfSec').exist = 0;
		}
	};

	RsiLessThan = () => e => {
		if (e.target.checked) {
			filters.find(v => v.name == 'RsiLessThan').exist = 1;
		} else {
			filters.find(v => v.name == 'RsiLessThan').exist = 0;
		}
	};

	CsSelected = e => {
		selectedCs = e.target.value;
		console.log('selectedCs = ', selectedCs);
		if (selectedCs != 'none') {
			filters.find(v => v.name == 'CsSelected').exist = 1;
		} else {
			filters.find(v => v.name == 'CsSelected').exist = 0;
		}
	};

	PriceEn = e => {
		if (e.target.checked) {
			this.setState({priceFilterEn: 1});
			filters.find(v => v.name == 'PriceLimit').exist = 1;
		} else {
			this.setState({priceFilterEn: 0});
			filters.find(v => v.name == 'PriceLimit').exist = 0;
		}
	};

	onChangeMinP = e => {
		priceMinVal = e.target.value;
	};

	onChangeMaxP = e => {
		priceMaxVal = e.target.value;
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
					{csName.map((value, i) => (
						<MenuItem
							key={value}
							value={csNameOrig[i]}
							style={{fontFamily: 'Courier New, Courier, monospace'}}>
							{value.toString() +
								' (' +
								allRows
									.filter((v, i) => v.l18.match(/^([^0-9]*)$/))
									.filter(v => v.csName == csNameOrig[i]).length +
								')'}
						</MenuItem>
					))}
				</TextField>
				<br />
				<br />

				<input
					disabled={this.state.priceFilterEn ? '' : 'disabled'}
					onChange={this.onChangeMinP}
					type="text"
					id="outlined-basic"
					label="min"
					variant="outlined"
					style={{width: '70px'}}
				/>

				<span style={{fontFamily: 'Courier New, Courier, monospace'}}>{' < قیمت < '}</span>
				<input
					disabled={this.state.priceFilterEn ? '' : 'disabled'}
					onChange={this.onChangeMaxP}
					type="text"
					id="outlined-basic"
					label="min"
					variant="outlined"
					style={{width: '70px'}}
				/>

				<FormControlLabel
					style={{margin: '0 0 0 20px'}}
					control={
						<Checkbox
							checked={null}
							onChange={this.PriceEn}
							value="gilad"
							inputProps={{
								'aria-label': 'secondary checkbox',
							}}
							color="primary"
						/>
					}
					label="enable"
				/>
				<br />
				<br />
			</div>
		);
	}
}
export {Settings, filters};
