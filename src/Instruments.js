import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
var numeral = require('numeral');
import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';

Object.defineProperty(Array.prototype, 'chunk', {
	value: function(chunkSize) {
		var R = [];
		for (var i = 0; i < this.length; i += chunkSize) R.push(this.slice(i, i + chunkSize));
		return R;
	},
});

const Scale = num => {
	let in_min = 0,
		in_max = 100,
		out_min = 30,
		out_max = 100;
	return Math.round(((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min);
};
const FindSecAvg = csNameOrig => {
	let num = allRows.filter((v3, i) => v3.l18.match(/^([^0-9]*)$/)).filter(({csName}) => csName == csNameOrig);
	let coef;
	let secAvg =
		num.reduce((a, c) => {
			c.flow == 4 ? (coef = 5 / 3) : (coef = 1);
			return a + c.pcp * coef;
		}, 0) / num.length;
	return secAvg;
};
let t, cntr;
let instruments = csNameOrig.map((v, i) => ({
	nameOrig: v,
	myName: csName[i],
	cs: (t = allRows.find(v1 => v1.l30 == v) ? t.cs : 0),
	avg: FindSecAvg(v),
}));
class Instruments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let rows = instruments
			.map((v, i) => (
				<td
					style={{
						textAlign: 'center',
						border: '1px solid black',
						fontFamily: 'Courier New, Courier, monospace',
						margin: '5px',
						fontSize: '13px',
						padding: '5px',
						backgroundColor: v.avg > 0 ? "hsl(102, 99, Scale(Math.round((v.avg * 100) / 5)))" : '#fff',
					}}>
					<span>{v.myName}</span>
					<br />
					<span>{numeral(v.avg).format()}</span>
				</td>
			))
			.chunk(3);
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
				<table>
					{rows.map((row, i) => (
						<tr style={{height: '40px'}}>{row}</tr>
					))}
				</table>
			</div>
		);
	}
}
export {Instruments};
