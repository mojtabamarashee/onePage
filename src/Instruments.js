import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';

Object.defineProperty(Array.prototype, 'chunk', {
	value: function(chunkSize) {
		var R = [];
		for (var i = 0; i < this.length; i += chunkSize) R.push(this.slice(i, i + chunkSize));
		return R;
	},
});

class Instruments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let rows = csName.map((v, i) => <td style={{border: "1px solid black"}}>{v}</td>).chunk(3);
        console.log("rows = ", rows);
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
				<table >
					{rows.map((row, i) => (
						<tr style={{height:'40px'}}>{row}</tr>
					))}
				</table>
			</div>
		);
	}
}
export {Instruments};
