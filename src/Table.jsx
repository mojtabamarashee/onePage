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
  ctx;
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
    ctx.moveTo(
      0 + canvasMargin * canvas.width,
      canvas.height -
        Scale(
          data[0],
          minD,
          maxD,
          min,
          canvas.height - canvasMargin * canvas.height,
        ),
    );

    data.forEach((v1, i1) => {
      let x = Scale(
        i1,
        0,
        data.length,
        0.05 * canvas.width,
        canvas.width - canvasMargin * canvas.height,
      );
      let y = canvas.height - Scale(v1, minD, maxD, min, canvas.height);
      ctx.lineTo(x, y);
    });

    ctx.stroke();
  };

  componentDidMount() {
    curRows = allRows;
    var numeral = require('numeral');

    //allRows
    //  .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
    //  .forEach((v, i) => {
    //    if (v && v.pClosingHist) {
    //      let canvas = document.getElementById(v.inscode.toString());
    //      let ctx = canvas.getContext('2d');
    //      let data = v.pClosingHist.filter((v, i) => i < 60).reverse();

    //      let min = Math.min(...data);
    //      let max = Math.max(...data);
    //      if (v.name == 'کمند') {
    //        console.log('min = ', min);
    //        console.log('max = ', max);
    //        console.log('pClosingHist = ', v.pClosingHist);
    //      }

    //      min = min - 0.001 * min;
    //      max = max + 0.001 * max;

    //      ctx.beginPath();
    //      ctx.moveTo(
    //        0 + 0.05 * canvas.width,
    //        canvas.height -
    //          Scale(
    //            data[0],
    //            min,
    //            max,
    //            0 + 0.05 * canvas.height,
    //            canvas.height - 0.05 * canvas.height,
    //          ),
    //      );
    //      data.forEach((v1, i1) => {
    //        let y =
    //          canvas.height -
    //          Scale(
    //            v1,
    //            min,
    //            max,
    //            0 + 0.05 * canvas.height,
    //            canvas.height - 0.05 * canvas.height,
    //          );

    //        let x = Scale(
    //          i1,
    //          0,
    //          data.length,
    //          0 + 0.05 * canvas.width,
    //          canvas.width - 0.05 * canvas.width,
    //        );
    //        ctx.lineTo(x, y);
    //      });

    //      ctx.stroke();
    //    }
    //  });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.pClosingHist)
      .forEach((v, i) => {
        let canvas = document.getElementById(v.inscode);
        this.Plot(
          v.inscode.toString(),
          v.pClosingHist.filter((v, i) => i < 60).reverse(),
          canvasMargin * canvas.height,
          canvas.height - canvasMargin * canvas.height,
        );
      });

    allRows
      .filter((v1, i1) => v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.vHist)
      .forEach((v, i) => {
        this.Plot(
          v.inscode.toString(),
          v.vHist.filter((v, i) => i < 60).reverse(),
          canvasMargin * canvas.height,
          canvas.height / 2,
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
                <td>plot</td>
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
                        <td>{v.name}</td>
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
                        <td>{v.d5}</td>
                        <td>{v.d10}</td>
                        <td>{v.d30}</td>
                        <td>{v.d60}</td>
                        <td>{v.d360}</td>
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
                        {
                          <td style={{padding: 0}}>
                            <canvas
                              id={v.inscode.toString()}
                              //ref={ref => eval("this." + temp + " = ref")}
                              width="70px"
                              height="33px"
                              style={{
                                display: 'block',
                                maxHeight: '100%',
                                margin: 0,
                              }}
                            />
                          </td>
                        }
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
