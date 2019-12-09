
import React from 'react';
import './table.css';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';

var numeral = require('numeral');
numeral.defaultFormat('0,0.[00]');
class Table extends React.Component {
	componentDidMount() {
		var numeral = require('numeral');
		$('#table').DataTable({
			order: [[1, 'desc']],
			pageLength: 100,
			scrollX: true,
			fixedColumns: {
				leftColumns: 1,
				rightColumns: 0,
			},
		});
	}
	componentWillUnmount() {}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		let max;
		let mm;
		const yellowColor = {color: 'yellow'};
		const blackColor = {color: 'black'};
		let stylee, bgColor, color, num;
		return (
			<div>
				<FontAwesomeIcon onClick={()=>this.props.ChangeMode("table")} icon={faCog} size="3x" color="lightBlue"/>
				<br />
				<br />
				<div class="table-responsive">
					<table id="table" className="table table-striped table-bordered display nowrap">
						<thead>
							<tr className="success">
								<td>name</td>
								<td>pe</td>
								<td>SPe</td>
								<td>tgh</td>
								<td>Q</td>
								<td>MM</td>
								<td>f</td>
								<td>tV</td>
								<td>fV%</td>
							</tr>
						</thead>
						<tbody>
							{allRows.filter((v, i) => v.l18.match(/^([^0-9]*)$/)).map(
								(v, i) => (
									(stylee = {color: v.color}),
									(
										<tr>
											<td>{v.l18}</td>
											<td>{v.pe}</td>
											<td>{v.sectorPE}</td>
											{
												(v.plp >= 0 ? (color = 'green') : (color = 'red'),
												<td style={{color: color}}>{v.plp}</td>)
											}
											{
												((num =
													Math.round(v.po1) == Math.round(v.tmin) && v.qd1 == 0
														? -v.qo1
														: Math.round(v.pd1) == Math.round(v.tmax) && v.qd1 > 0
															? v.qd1
															: 0),
												num > 0 ? (color = 'green') : (color = 'red'),
												(
													<td data-sort={num} style={{color: color}}>
														{numeral(num)
															.format('0a')
															.toUpperCase()}
													</td>
												))
											}
											{
												(((max = Math.max.apply(null, v.hist.map(v => v.PClosing))),
												(mm = numeral(-((max - v.pc) / max) * 100).format())),
												v.afzayeshSarmayeh == 0 ? (bgColor = []) : (bgColor = '#C0C0C0'),
												<td bgColor={bgColor}> {mm} </td>)
											}
											<td style={stylee}>{v.flow}</td>
											<td>
												{numeral(v.totalVol)
													.format('0a')
													.toUpperCase()}
											</td>
											<td>{v.floatVal}</td>
										</tr>
									)
								),
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export {Table};
