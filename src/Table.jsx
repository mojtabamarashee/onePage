import React from 'react';
import './table.css';
import ReactDOM from 'react-dom';
import _ from 'lodash';
let curRows = allRows,
  url,
  tableThis,
  table,
  columns,
  request,
  temp,
  ctx,
  dataSort;
var numeral = require('numeral');
let canvasMargin = 0.05;
numeral.defaultFormat('0,0.[00]');
const Scale = (num, in_min, in_max, out_min, out_max) => {
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
  );
};
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PEPosFlag: 0,
      PESmallerThanSecFlag: 0,
      d360: [],
    };
    tableThis = this;
  }

  Plot = (canvasId, data, min, max, color) => {
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');

    let minD = Math.min(...data);
    let maxD = Math.max(...data);

    minD = minD - 0.001 * minD;
    maxD = maxD + 0.001 * maxD;

    ctx.beginPath();
    if (color) ctx.strokeStyle = color;
    ctx.moveTo(
      0 + canvasMargin * canvas.width,
      canvas.height - Scale(data[0], minD, maxD, min, max),
    );

    data.forEach((v1, i1) => {
      let x = Scale(
        i1,
        0,
        data.length,
        0.05 * canvas.width,
        canvas.width - canvasMargin * canvas.height,
      );
      let y = canvas.height - Scale(v1, minD, maxD, min, max);
      ctx.lineTo(x, y);
    });

    ctx.stroke();
  };

  componentDidMount() {
    curRows = allRows;
    var numeral = require('numeral');

    //5d voloume
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        let data = v.vHist.filter((v, i) => i < 4).reverse();
        data.push(v.tvol);
        let canvas = document.getElementById('v5d' + v.inscode);
        this.Plot(
          'v5d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height / 2,
          '#0000FF',
        );
      });

    //5d price
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let data = v.pClosingHist.filter((v, i) => i < 4).reverse();
        data.push(v.pc);
        let canvas = document.getElementById('v5d' + v.inscode);
        this.Plot(
          'v5d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          '#000000',
        );
      });

    //10d voloume
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        let data = v.vHist.filter((v, i) => i < 9).reverse();
        data.push(v.tvol);
        let canvas = document.getElementById('v10d' + v.inscode);
        this.Plot(
          'v10d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height / 2,
          '#0000FF',
        );
      });

    //10d hist
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let data = v.pClosingHist.filter((v, i) => i < 9).reverse();
        data.push(v.pc);
        let canvas = document.getElementById('v10d' + v.inscode);
        this.Plot(
          'v10d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          '#000000',
        );
      });

    //30d volume
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        let data = v.vHist.filter((v, i) => i < 29).reverse();
        data.push(v.tvol);
        let canvas = document.getElementById('v30d' + v.inscode);
        this.Plot(
          'v30d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height / 2,
          '#0000FF',
        );
      });

    //30d price
    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let data = v.pClosingHist.filter((v, i) => i < 29).reverse();
        data.push(v.pc);
        let canvas = document.getElementById('v30d' + v.inscode);
        this.Plot(
          'v30d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          '#000000',
        );
      });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        let data = v.vHist.filter((v, i) => i < 59).reverse();
        data.push(v.tvol);
        let canvas = document.getElementById('v60d' + v.inscode);
        this.Plot(
          'v60d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height / 2,
          '#0000FF',
        );
      });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let data = v.pClosingHist.filter((v, i) => i < 59).reverse();
        data.push(v.pc);
        let canvas = document.getElementById('v60d' + v.inscode);
        this.Plot(
          'v60d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          '#000000',
        );
      });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        let data = v.vHist.filter((v, i) => i < 249).reverse();
        data.push(v.tvol);
        let canvas = document.getElementById('v360d' + v.inscode);
        this.Plot(
          'v360d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height / 2,
          '#0000FF',
        );
      });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let data = v.pClosingHist.filter((v, i) => i < 249).reverse();
        data.push(v.pc);
        let canvas = document.getElementById('v360d' + v.inscode);
        this.Plot(
          'v360d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          '#000000',
        );
      });

    table = $('#table').DataTable({
      order: [[1, 'desc']],
      pageLength: 10,
      scrollX: true,
      fixedColumns: {
        leftColumns: 1,
        rightColumns: 0,
      },
    });
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

    let maxI;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      maxI = 1;
    } else {
      // production code
      maxI = 3000;
    }
    return (
      <div style={{margin: '5px'}}>
        <div className="table-responsive">
          <table
            id="table"
            className="table table-striped table-bordered display nowrap">
            <thead>
              <tr className="success">
                <td>name</td>
                <td>ق.پ</td>
                <td>pe</td>
                <td>SPe</td>
                <td>tgh</td>
                <td>م.ت.گ</td>
                <td>v</td>
                <td>bs</td>
                <td>RSI</td>
                <td>Q</td>
                <td>mm60</td>
                <td>mmY</td>
                <td>f</td>
                <td>tV</td>
                <td>fV%</td>
                <td>5d</td>
                <td>10d</td>
                <td>30d</td>
                <td>60d</td>
                <td>360d</td>
                <td>hv</td>
                <td>hn</td>
                <td>cs</td>
                <td>l</td>
                <td>س</td>
                <td>t</td>
              </tr>
            </thead>
            <tbody>
              {allRows
                .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
                .map(
                  (v, i) => (
                    (stylee = {color: v.color}),
                    (
                      <tr key={v.l30}>
                        <td >{v.name}</td>
                        <td>{v.pc}</td>
                        <td>{v.pe}</td>
                        <td>{v.sectorPE}</td>
                        {
                          (v.pcp >= 0 ? (color = 'green') : (color = 'red'),
                          <td style={{color: color}}>{v.pcp}</td>)
                        }
                        {
                          ((num = allRows
                            .filter((v3, i) => v3.l18.match(/^([^0-9]*)$/))
                            .filter(v1 => v1.cs == v.cs)),
                          (secAvg =
                            num.reduce((a, c) => {
                              c.flow == 4 ? (coef = 5 / 3) : (coef = 1);
                              return a + c.pcp * coef;
                            }, 0) / num.length),
                          secAvg >= 0 ? (color = 'green') : (color = 'red'),
                          (
                            <td data-sort={secAvg} style={{color: color}}>
                              {numeral(secAvg).format() +
                                ' (' +
                                num.length +
                                ')'}
                            </td>
                          ))
                        }
                        <td data-sort={v.tvol}>
                          {numeral(v.tvol)
                            .format('0a')
                            .toUpperCase()}
                        </td>
                        <td>
                          {numeral(
                            v.ct.Sell_CountI /
                              v.ct.Sell_I_Volume /
                              (v.ct.Buy_CountI / v.ct.Buy_I_Volume),
                          ).format()}
                        </td>
                        <td>{v.rsi}</td>
                        {
                          ((num =
                            Math.round(v.po1) == Math.round(v.tmin) &&
                            v.qd1 == 0
                              ? -v.qo1
                              : Math.round(v.pd1) == Math.round(v.tmax) &&
                                v.qd1 > 0
                              ? v.qd1
                              : 0),
                          num >= 0 ? (color = 'green') : (color = 'red'),
                          (
                            <td data-sort={num} style={{color: color}}>
                              {numeral(num)
                                .format('0a')
                                .toUpperCase()}
                            </td>
                          ))
                        }
                        {
                          (v.afzayeshSarmayeh == 0
                            ? (bgColor = [])
                            : (bgColor = '#C0C0C0'),
                          <td bgcolor={bgColor}> {v.mm} </td>)
                        }
                        {
                          (v.afzayeshSarmayeh == 0
                            ? (bgColor = [])
                            : (bgColor = '#C0C0C0'),
                          <td bgcolor={bgColor}> {v.mmY} </td>)
                        }
                        <td style={stylee}>{v.flow}</td>
                        <td data-sort={v.totalVol}>
                          {numeral(v.totalVol)
                            .format('0a')
                            .toUpperCase()}
                        </td>
                        <td>{v.floatVal}</td>
                        {
                          (v.d5
                            ? v.d5 > 0
                              ? ((dataSort = v.d5), (color = 'green'))
                              : ((dataSort = v.d5), (color = 'red'))
                            : ((color = 'red'), (dataSort = 0)),
                          (
                            <td
                              data-sort={dataSort == 'NaN' ? 0 : dataSort}
                              style={{padding: 0, color: color}}>
                              {v.d5}
                              <canvas
                                id={'v5d' + v.inscode.toString()}
                                width="70px"
                                height="33px"
                                style={{
                                  display: 'block',
                                  maxHeight: '100%',
                                  margin: 0,
                                }}
                              />
                            </td>
                          ))
                        }
                        {
                          (v.d10
                            ? v.d10 > 0
                              ? ((dataSort = v.d10), (color = 'green'))
                              : ((dataSort = v.d10), (color = 'red'))
                            : ((color = 'red'), (dataSort = 0)),
                          (
                            <td
                              data-sort={dataSort == 'NaN' ? 0 : dataSort}
                              style={{padding: 0, color: color}}>
                              {v.d10}
                              <canvas
                                id={'v10d' + v.inscode.toString()}
                                width="70px"
                                height="33px"
                                style={{
                                  display: 'block',
                                  maxHeight: '100%',
                                  margin: 0,
                                }}
                              />
                            </td>
                          ))
                        }
                        {
                          (v.d30
                            ? v.d30 > 0
                              ? ((dataSort = v.d30), (color = 'green'))
                              : ((dataSort = v.d30), (color = 'red'))
                            : ((color = 'red'), (dataSort = 0)),
                          (
                            <td
                              data-sort={dataSort == 'NaN' ? 0 : dataSort}
                              style={{padding: 0, color: color}}>
                              {v.d30}
                              <canvas
                                id={'v30d' + v.inscode.toString()}
                                width="70px"
                                height="33px"
                                style={{
                                  display: 'block',
                                  maxHeight: '100%',
                                  margin: 0,
                                }}
                              />
                            </td>
                          ))
                        }
                        {
                          (v.d60
                            ? v.d60 > 0
                              ? ((dataSort = v.d60), (color = 'green'))
                              : ((dataSort = v.d60), (color = 'red'))
                            : ((color = 'red'), (dataSort = 0)),
                          (
                            <td
                              data-sort={dataSort == 'NaN' ? 0 : dataSort}
                              style={{padding: 0, color: color}}>
                              {v.d60}
                              <canvas
                                id={'v60d' + v.inscode.toString()}
                                width="70px"
                                height="33px"
                                style={{
                                  display: 'block',
                                  maxHeight: '100%',
                                  margin: 0,
                                }}
                              />
                            </td>
                          ))
                        }
                        {
                          (v.d360
                            ? v.d360 > 0
                              ? ((dataSort = v.d360), (color = 'green'))
                              : ((dataSort = v.d360), (color = 'red'))
                            : ((color = 'red'), (dataSort = 0)),
                          (
                            <td
                              data-sort={dataSort == 'NaN' ? 0 : dataSort}
                              style={{padding: 0, color: color}}>
                              {v.d360}
                              <canvas
                                id={'v360d' + v.inscode.toString()}
                                width="70px"
                                height="33px"
                                style={{
                                  display: 'block',
                                  maxHeight: '100%',
                                  margin: 0,
                                }}
                              />
                            </td>
                          ))
                        }
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
                        <td>{v.pClosingHist ? v.pClosingHist.length : null}</td>
                        <td>
                          <a
                            href={
                              'https://www.sahamyab.com/hashtag/' +
                              v.name +
                              '/post'
                            }>
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

export {Table, curRows, tableThis, table, columns};
