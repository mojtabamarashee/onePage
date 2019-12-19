import React from 'react';
import './table.css';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
let curRows = allRows,
	tableThis,
	table;
var numeral = require('numeral');
numeral.defaultFormat('0,0.[00]');
class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			PEPosFlag: 0,
			PESmallerThanSecFlag: 0,
		};
		tableThis = this;
	}

	componentDidMount() {
		curRows = allRows;
		var numeral = require('numeral');
		table = $('#table').DataTable({
			order: [[1, 'desc']],
			pageLength: 10,
			scrollX: true,
			fixedColumns: {
				leftColumns: 1,
				rightColumns: 0,
			},
		});
		curRows = [];
	}

	componentWillUnmount() {}

	ChangeSettings = obj => {
		this.state.settings(obj);
	};

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	GetCurRows = () => {
		curRows = allRows;
		if (this.state.PEPosFlag) {
			curRows = allRows.filter((v, i) => v.pe > 0);
		}

		if (this.state.PESmallerThanSecFlag) {
			if (v.sectorPE > 0) curRows = curRows.filter((v, i) => v.pe < v.sectorPE);
			else curRows = curRows.filter((v, i) => v.pe > v.sectorPE);
		}
	};

	render() {
		let max, coef, sumAll;
		let mm, t1, t2;
		const yellowColor = {color: 'yellow'};
		const blackColor = {color: 'black'};
		let stylee, bgColor, color, num, secAvg;
		this.GetCurRows();
		return (
			<div style={{margin: '5px'}}>
				<FontAwesomeIcon
					style={{margin: '0 0 5px 0'}}
					onClick={() => this.props.ChangeMode('table')}
					icon={faCog}
					size="3x"
					color="lightBlue"
				/>
				<FontAwesomeIcon
					style={{margin: '0 0 5px 0', float: 'right'}}
					onClick={null}
					icon={faQuestionCircle}
					size="3x"
					color="lightBlue"
				/>
				<div className="table-responsive">
					<table id="table" className="table table-striped table-bordered display nowrap">
						<thead>
							<tr className="success">
								<td>name</td>
								<td>pe</td>
								<td>SPe</td>
								<td>tgh</td>
								<td>م.ت.گ</td>
								<td>v</td>
								<td>bs</td>
								<td>RSI</td>
								<td>Q</td>
								<td>MM</td>
								<td>f</td>
								<td>tV</td>
								<td>fV%</td>
								<td>5d</td>
								<td>10d</td>
								<td>30d</td>
								<td>60d</td>
								<td>حv</td>
								<td>حn</td>
								<td>cs</td>
								<td>س</td>
								<td>t</td>
							</tr>
						</thead>
						<tbody>
							{allRows.filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/)).map(
								(v, i) => (
									(stylee = {color: v.color}),
									(
										<tr key={v.l30}>
											<td>{v.name}</td>
											<td>{v.pe}</td>
											<td>{v.sectorPE}</td>
											{
												(v.plp >= 0 ? (color = 'green') : (color = 'red'),
												<td style={{color: color}}>{v.plp}</td>)
											}
											{
												((num = allRows
													.filter((v3, i) => v3.l18.match(/^([^0-9]*)$/))
													.filter(v1 => v1.cs == v.cs)),
												(secAvg =
													num.reduce((a, c) => {
														c.flow == 4 ? (coef = 5 / 3) : (coef = 1);
														return a + c.plp * coef;
													}, 0) / num.length),
												secAvg >= 0 ? (color = 'green') : (color = 'red'),
												(
													<td data-sort={secAvg} style={{color: color}}>
														{numeral(secAvg).format() + ' (' + num.length + ')'}
													</td>
												))
											}

											<td data-sort={v.tvol}>
												{numeral(v.tvol)
													.format('0a')
													.toUpperCase()}
											</td>
											<td>
												{numeral((v.ct.Buy_CountI / v.ct.Buy_I_Volume) / (v.ct.Sell_CountI / v.ct.Sell_I_Volume)).format()}
											</td>
											<td>{v.rsi}</td>
											{
												((num =
													Math.round(v.po1) == Math.round(v.tmin) && v.qd1 == 0
														? -v.qo1
														: Math.round(v.pd1) == Math.round(v.tmax) && v.qd1 > 0
															? v.qd1
															: null),
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
												(v.afzayeshSarmayeh == 0 ? (bgColor = []) : (bgColor = '#C0C0C0'),
												<td bgcolor={bgColor}> {v.mm} </td>)
											}
											<td style={stylee}>{v.flow}</td>
											<td data-sort={v.totalVol}>
												{numeral(v.totalVol)
													.format('0a')
													.toUpperCase()}
											</td>
											<td>{v.floatVal}</td>

											<td>{v.d5}</td>
											<td>{v.d10}</td>
											<td>{v.d30}</td>
											<td>{v.d60}</td>
											<td data-sort={v.ct.Buy_N_Volume}>
												{numeral(v.ct.Buy_N_Volume)
													.format('0a')
													.toString()
													.toUpperCase()}
											</td>
											<td data-sort={v.ct.Buy_CountN}>
												{numeral(v.ct.Buy_CountN)
													.format('0a')
													.toString()
													.toUpperCase()}
											</td>
											<td>{v.cs}</td>

											<td>
												<a href={'https://www.sahamyab.com/hashtag/' + v.name + '/post'}>
													<img
														style={{display: 'block'}}
														width="100%"
														height="100%"
														src="http://smojmar.github.io/upload/sahamYab.png"
													/>
												</a>
											</td>

											<td>
												<a
													href={
														'http://www.tsetmc.com/loader.aspx?ParTree=151311&i=' +
														v.inscode
													}>
													<img
														style={{display: 'block'}}
														width="100%"
														height="100%"
														src="http://smojmar.github.io/upload/tseIcon.jpg"
													/>
												</a>
											</td>
										</tr>
									)
								),
							)}
						</tbody>
					</table>
					<br />
					<br />
					<div style={{textAlign: 'center'}}>
						<span style={{fontFamily: 'Courier New, Courier, monospace'}}>
							دانلود شده از
							<a href="https://telegram.me/filtermarket1"> کانال تلگرام</a>
						</span>
						<br />
					</div>
				</div>
			</div>
		);
	}
}

export {Table, curRows, tableThis, table};
