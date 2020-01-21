import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as XLSX from '../node_modules/xlsx/dist/xlsx.min.js';
import {table} from './Table.jsx';
var portfoo = {test : 1};

const SavePortfo = portfo => {
	console.log('porfo5 = ', portfo);
	try {
		console.log('portfo1 = ', portfo);
		const serializedState = JSON.stringify(portfo);
		console.log('serializedState = ', serializedState);
		localStorage.setItem('portfo', serializedState);
	} catch (err) {
		console.log('portfo4 = ', portfo);
		return undefined;
	}
};

class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<FontAwesomeIcon
					onClick={() => this.props.ChangeMode('table')}
					calssName={'mr-3'}
					icon={faLongArrowAltLeft}
					size="4x"
					color="black"
				/>
				<br />
				<br />
				<input
					accept=".xls,.xlsx"
					style={{display: 'none'}}
					id="raised-button-file"
					multiple
					type="file"
					onChange={e => {
						var file = e.target.files[0];
						const reader = new FileReader();
						reader.readAsArrayBuffer(file);
						reader.onload = e => {
							var data = new Uint8Array(e.target.result);
							var wb = XLSX.read(data, {type: 'array'});
							var ws = wb.Sheets[wb.SheetNames[0]];
							var data = XLSX.utils.sheet_to_json(ws, {raw: true, header: 1});
                            
							portfoo.symbols = data.map(v => v[0]);
							console.log('portfo2 = ', portfoo);
							SavePortfo(portfoo);
						};
					}}
				/>
				<label htmlFor="raised-button-file">
					<Button variant="raised" component="span" style={{backgroundColor: '#007bff', color: 'white'}}>
						Upload portfo (excel)
					</Button>
				</label>
			</div>
		);
	}
}
export {Setting};
