import React from 'react';
import './table.css';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {SymbolPage} from './SymbolPage.jsx';
import {Link} from 'react-router-dom';
import {instHistory} from 'react-router-dom';
import {that as filterThis} from './Filter.jsx';

let curRows = allRows,
  url,
  tableThis,
  table,
  columns,
  request,
  temp,
  ctx,
  dataSort,
  color2,
  bgColor,
  fgColor,
  width,
  index,
  backgroundColor,
  portfo,
  iterateList = [];
var numeral = require('numeral');
let canvasMargin = 0.05;
numeral.defaultFormat('0,0.[00]');
const CANVAS_WIDTH = '70px';
const CANVAS_HEIGHT = '23px';
const Scale = (num, in_min, in_max, out_min, out_max) => {
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
  );
};

const LoadPortfo = () => {
  try {
    const serializedState = localStorage.getItem('portfo');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const CreateTable = data => {
  let stylee, bgColor, color, num, secAvg;
  let max, coef, sumAll;
  let mm, t1, t2;
  const yellowColor = {color: 'yellow'};
  const blackColor = {color: 'black'};

  let ONC = () => {
    console.log('erer');
  };
  return (
    <div style={{margin: '5px'}}>
      <div className="table-responsive">
        <table
          id="table"
          className="table table-striped table-bordered display nowrap">
          <thead>
            <tr className="success">
              <td>name</td>
              <td>pe</td>
              <td>tg</td>
              <td>sw</td>
              <td>v</td>
              <td>bs</td>
              <td>RSI</td>
              <td>Q</td>
              <td>mm</td>
              <td>f</td>
              <td>tv</td>
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
            {data
              .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
              .map(
                (v, i) => (
                  (stylee = {color: v.color}),
                  (
                    <tr key={v.l18 + i}>
                      {
                        (portfo &&
                        portfo.length > 1 &&
                        portfo.find(v1 => v1.symbol == v.name)
                          ? (backgroundColor = 'lightYellow')
                          : (backgroundColor = '!important'),
                        (
                          <td
                            key={i + v.fullName}
                            data-search={v.fullName + '___' + v.name}
                            style={{
                              margin: '0',
                              padding: '0 0 0 4px',
                              fontSize: '14px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              backgroundColor: backgroundColor,
                            }}>
                            <div
                              onClick={ONC}
                              style={{
                                fontWeight: 'bold',
                              }}>
                              <a href={'/' + v.name} target="_blank">
                                {v.name}
                              </a>
                            </div>
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />
                            {
                              (Math.round(v.po1) == Math.round(v.tmin) &&
                              v.qd1 == 0
                                ? ((bgColor = '#ff6666'), (fgColor = 'white'))
                                : Math.round(v.pd1) == Math.round(v.tmax) &&
                                  v.qd1 > 0
                                ? ((bgColor = '#00ff00'), (fgColor = 'gray'))
                                : ((bgColor = '!important'),
                                  (fgColor = 'black')),
                              console.log(''))
                            }
                            <div>
                              <span
                                style={{
                                  margin: '0',
                                  padding: '0 0 0 0px',
                                  fontSize: '14px',
                                }}>
                                {v.pc}
                              </span>
                              <div
                                style={{
                                  height: '2px',
                                  backgroundColor:
                                    v.plp > 0 ? '#00ff00' : '#ff7777',
                                  width:
                                    Math.abs(v.plp) *
                                      20 *
                                      (v.flow == 4 ? 5 / 3 : 1) +
                                    '%',
                                  display: 'block',
                                  color: fgColor,
                                }}
                              />
                            </div>
                          </td>
                        ))
                      }
                      <td
                        data-sort={v.pe || 0}
                        style={{
                          margin: '0',
                          padding: '0 0 0 4px',
                          fontSize: '14px',
                          display: 'block',
                        }}>
                        {Math.round((v.pe || 0) * 10) / 10}
                        <p
                          style={{
                            clear: 'left',
                            margin: '0',
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 'bold',
                          }}>
                          {Math.round(v.sectorPE * 10) / 10}
                        </span>
                      </td>
                      {
                        ((num = data
                          .filter(
                            (v3, i) => v3.l18 && v3.l18.match(/^([^0-9]*)$/),
                          )
                          .filter(v1 => v1.cs == v.cs)),
                        (secAvg =
                          num.reduce((a, c) => {
                            c.flow == 4 ? (coef = 5 / 3) : (coef = 1);
                            return a + c.pcp * coef;
                          }, 0) / num.length),
                        secAvg >= 0 ? (color = 'green') : (color = 'red'),
                        v.pcp >= 0 ? (color2 = 'green') : (color2 = 'red'),
                        (
                          <td
                            data-sort={v.pcp}
                            style={{
                              padding: '0 0 0 4px',
                              fontSize: '14px',
                            }}>
                            <span
                              style={{
                                color: color2,
                              }}>
                              {Math.round(v.pcp * 100) / 100}
                            </span>
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />
                            <span
                              style={{
                                color: color,
                                fontWeight: 'bold',
                              }}>
                              {numeral(secAvg).format()}
                            </span>
                          </td>
                        ))
                      }
                      {
                        (v.pmin && v.pmax && v.pcp
                          ? (dataSort = ((v.pmax - v.pmin) / v.pc) * 100)
                          : (dataSort = 0),
                        (
                          <td
                            style={{
                              padding: '0 0 0 4px',
                              fontSize: '14px',
                            }}
                            data-sort={dataSort}>
                            {numeral(((v.pmax - v.pmin) / v.pc) * 100).format()}
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />
                          </td>
                        ))
                      }
                      {
                        ((index = data.findIndex(
                          v1 => v1.l18 && v1.l18 == v.l18,
                        )),
                        (t1 =
                          numeral(v.tvol)
                            .format('0a')
                            .toUpperCase()
                            .toString() + '\n\r'),
                        (data[index].av30 = v.QTotTran5JAvg),
                        (t2 = numeral(data[index].av30)
                          .format('0a')
                          .toUpperCase()),
                        (
                          <td
                            style={{
                              margin: '0',
                              padding: '0 0 0 4px',
                              fontSize: '14px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              fontFamily: 'Courier New, Courier, monospace',
                              display: 'block',
                              fontWeight: 'bold',
                            }}
                            data-sort={v.av30 == 0 ? -1 : v.tvol / v.av30}>
                            {t1}{' '}
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />{' '}
                            {t2}
                          </td>
                        ))
                      }
                      {
                        ((width =
                          v.Buy_I_Volume && v.tvol > 0
                            ? ((v.Buy_I_Volume / v.tvol) * 100).toString()
                            : '0'),
                        (
                          <td>
                            <span
                              style={{
                                padding: '0 0 0 4px',
                                fontSize: '14px',
                              }}>
                              {1
                                ? numeral(
                                    v.Sell_CountI /
                                      v.Sell_I_Volume /
                                      (v.Buy_CountI / v.Buy_I_Volume),
                                  ).format()
                                : null}
                            </span>
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />
                            <div
                              style={{
                                height: '10px',
                                borderStyle: 'groove',
                              }}>
                              <div
                                style={{
                                  backgroundColor: 'blue',
                                  width: width + '%',
                                  padding: '0',
                                  margin: '0',
                                  height: '100%',
                                }}
                              />
                            </div>
                          </td>
                        ))
                      }
                      <td>{v.rsi}</td>
                      {
                        ((num =
                          Math.round(v.po1) == Math.round(v.tmin) &&
                          (v.qd1 == 0 || v.qo1 < v.tmin)
                            ? -v.po1 * v.pd1
                            : Math.round(v.qo1) == Math.round(v.tmax) &&
                              (v.pd1 == 0 || v.po1 > v.tmax)
                            ? v.qo1 * v.qd1
                            : 0),
                        v.name == 'پترول'
                          ? (console.log('tmax = ', v.tmax),
                            console.log('pd1 = ', v.pd1),
                            console.log('qd1 = ', v.qd1),
                            console.log('qo1 = ', v.qo1),
                            console.log('v = ', v.name))
                          : null,
                        num >= 0 ? (color = 'green') : (color = 'red'),
                        (
                          <td
                            data-sort={num}
                            style={{
                              color: color,
                            }}>
                            {numeral(num)
                              .format('0a')
                              .toUpperCase()}
                          </td>
                        ))
                      }
                      {
                        (GetMM(v),
                        (
                          <td
                            data-sort={v.mmY ? v.mmY : 0}
                            style={{
                              padding: '0 0 0 4px',
                              fontSize: '14px',
                            }}>
                            <span>{v.mm ? v.mm : null}</span>
                            <p
                              style={{
                                clear: 'left',
                                margin: '0',
                              }}
                            />
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}>
                              {v.mmY ? v.mmY : null}
                            </span>
                          </td>
                        ))
                      }
                      <td style={stylee}>{v.flow}</td>
                      <td
                        style={{
                          padding: '0 0 0 4px',
                          fontSize: '14px',
                        }}
                        data-sort={v.totalVol}>
                        {numeral(v.totalVol)
                          .format('0a')
                          .toUpperCase()}
                        <p
                          style={{
                            clear: 'left',
                            margin: '0',
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 'bold',
                          }}>
                          {v.floatVal + '%'}
                        </span>
                      </td>
                      {
                        (v.d5
                          ? v.d5 > 0
                            ? ((dataSort = v.d5), (color = 'green'))
                            : ((dataSort = v.d5), (color = 'red'))
                          : ((color = 'red'), (dataSort = 0)),
                        (
                          <td
                            data-sort={dataSort == 'N' ? 0 : dataSort}
                            style={{
                              padding: 0,
                              color: color,
                              fontSize: '14px',
                              fontWeight: 'bold',
                            }}>
                            {numeral(v.d5).format() + '%'}
                            <canvas
                              id={'v5d' + v.inscode.toString()}
                              width={CANVAS_WIDTH}
                              height={CANVAS_HEIGHT}
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
                            data-sort={dataSort == 'N' ? 0 : dataSort}
                            style={{
                              padding: 0,
                              color: color,
                              fontSize: '14px',
                              fontWeight: 'bold',
                            }}>
                            {numeral(v.d10).format() + '%'}
                            <canvas
                              id={'v10d' + v.inscode.toString()}
                              width={CANVAS_WIDTH}
                              height={CANVAS_HEIGHT}
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
                            data-sort={dataSort == 'N' ? 0 : dataSort}
                            style={{
                              padding: 0,
                              color: color,
                              fontSize: '14px',
                              fontWeight: 'bold',
                            }}>
                            {numeral(v.d30).format() + '%'}
                            <canvas
                              id={'v30d' + v.inscode.toString()}
                              width={CANVAS_WIDTH}
                              height={CANVAS_HEIGHT}
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
                            data-sort={dataSort == 'N' ? 0 : dataSort}
                            style={{
                              padding: 0,
                              color: color,
                              fontSize: '14px',
                              fontWeight: 'bold',
                            }}>
                            {numeral(v.d60).format() + '%'}
                            <canvas
                              id={'v60d' + v.inscode.toString()}
                              width={CANVAS_WIDTH}
                              height={CANVAS_HEIGHT}
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
                            data-sort={dataSort == 'N' ? 0 : dataSort}
                            style={{
                              padding: 0,
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: color,
                            }}>
                            {numeral(v.d360).format() + '%'}
                            <canvas
                              id={'v360d' + v.inscode.toString()}
                              width={CANVAS_WIDTH}
                              height={CANVAS_HEIGHT}
                              style={{
                                display: 'block',
                                maxHeight: '100%',
                                margin: 0,
                              }}
                            />
                          </td>
                        ))
                      }
                      <td
                        data-sort={v.Buy_N_Volume ? v.Buy_N_Volume : 0}
                        style={{padding: 0}}>
                        {v.ct
                          ? numeral(v.Buy_N_Volume)
                              .format('0a')
                              .toString()
                              .toUpperCase()
                          : null}

                        <canvas
                          id={'hv' + v.inscode.toString()}
                          width={CANVAS_WIDTH}
                          height={CANVAS_HEIGHT}
                          style={{
                            display: 'block',
                            maxHeight: '100%',
                            margin: 0,
                          }}
                        />
                      </td>
                      {
                        <td
                          data-sort={v.Buy_CountN ? v.Buy_CountN : 0}
                          style={{padding: 0}}>
                          {v.ct
                            ? numeral(v.Buy_CountN)
                                .format('0a')
                                .toString()
                                .toUpperCase()
                            : null}
                          <canvas
                            id={'hn' + v.inscode.toString()}
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            style={{
                              display: 'block',
                              maxHeight: '100%',
                              margin: 0,
                            }}
                          />
                        </td>
                      }
                      <td>
                        <span
                          onClick={() => {
                            //let t = [];
                            //t.target = [];
                            //t.target.value = v.cs;
                            //console.log('t = ', t);
                            //filterThis.CsSelected(t);
                          }}>
                          {v.cs}
                        </span>
                      </td>
                      <td>{v.hist ? v.hist.length : null}</td>
                      <td>
                        <a
                          href={
                            'https://www.sahamyab.com/hashtag/' +
                            v.name +
                            '/post'
                          }
                          target="_blank">
                          <img
                            style={{
                              display: 'block',
                            }}
                            width="100%"
                            height="100%"
                            src="http://filterbourse.ir/upload/sahamYab.png"
                          />
                        </a>
                      </td>
                      <td>
                        <a
                          href={
                            'http://www.tsetmc.com/loader.aspx?ParTree=151311&i=' +
                            v.inscode
                          }
                          target="_blank">
                          <img
                            style={{
                              display: 'block',
                            }}
                            width="100%"
                            height="100%"
                            src="http://filterbourse.ir/upload/tseIcon.jpg"
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
          <span
            style={{
              fontFamily: 'Courier New, Courier, monospace',
            }}>
            دانلود شده از
            <a href="https://telegram.me/filtermarket1"> کانال تلگرام</a>
          </span>
          <br />
        </div>
      </div>
    </div>
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

    allRows.forEach(v => GetBazdeh(v));
  }

  Plot = (canvasId, data, min, max, op) => {
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');

    let minDOrig = Math.min(...data);
    let maxDOrig = Math.max(...data);

    let minD = minDOrig - 0.001 * minDOrig;
    let maxD = maxDOrig + 0.001 * maxDOrig;

    ctx.beginPath();
    if (op && op.color) ctx.strokeStyle = op.color;
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
      if (op && op.minMaxFlag) {
        if (v1 == minDOrig) {
          ctx.font = '10px Comic Sans MS';
          ctx.fillStyle = 'blue';
          ctx.textAlign = 'center';
          ctx.fillText(Math.round(minDOrig), x, y - 5);
        } else if (v1 == maxDOrig) {
          ctx.font = '10px Comic Sans MS bold';
          ctx.fillStyle = 'blue';
          ctx.textAlign = 'center';
          ctx.fillText(Math.round(maxDOrig), x, y + 10);
        }
      }

      ctx.lineTo(x, y);
    });

    ctx.stroke();
  };

  PlotVal = (canvasId, data, min, max, color) => {
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');

    let minD = Math.min(...data);
    let maxD = Math.max(...data);

    minD = minD - 0.001 * minD;
    maxD = maxD + 0.001 * maxD;

    ctx.beginPath();

    ctx.moveTo(
      0 + canvasMargin * canvas.width,
      canvas.height - Scale(maxD / 2, minD, maxD, min, max),
    );
    let x = Scale(
      canvas.width,
      0,
      data.length,
      0.05 * canvas.width,
      canvas.width - canvasMargin * canvas.height,
    );
    let y =
      canvas.height -
      Scale(maxD - canvasMargin * canvas.height, minD, maxD, min, max);
    ctx.lineTo(x, y);

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
      if (v1 > 0) {
        ctx.strokeStyle = 'blue';
      } else {
        ctx.strokeStyle = 'red';
      }

      ctx.lineTo(x, y);
    });

    ctx.stroke();
  };

  componentDidMount() {
    curRows = allRows;
    var numeral = require('numeral');

    //5d voloume
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
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
          {
            color: '#0000FF',
          },
        );
      });

    //5d price
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.hist)
      .forEach((v, i) => {
        let length = v.hist.length;
        let data = v.hist.map(v => v.pl).filter((v, i) => i > length - 5);
        data.push(v.pc);
        let canvas = document.getElementById('v5d' + v.inscode);
        this.Plot(
          'v5d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#000000',
          },
        );
      });

    //10d voloume
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
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
          {
            color: '#0000FF',
          },
        );
      });

    //10d hist
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.hist)
      .forEach((v, i) => {
        let length = v.hist.length;
        let data = v.hist.map(v => v.pl).filter((v, i) => i > length - 10);

        data.push(v.pc);
        let canvas = document.getElementById('v10d' + v.inscode);
        this.Plot(
          'v10d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#000000',
          },
        );
      });

    //30d volume
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
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
          {
            color: '#0000FF',
          },
        );
      });

    //30d price
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.hist)
      .forEach((v, i) => {
        let length = v.hist.length;
        let data = v.hist.map(v => v.pl).filter((v, i) => i > length - 30);

        data.push(v.pc);
        let canvas = document.getElementById('v30d' + v.inscode);
        this.Plot(
          'v30d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#000000',
          },
        );
      });

    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
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
          {
            color: '#0000FF',
          },
        );
      });

    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.hist)
      .forEach((v, i) => {
        let length = v.hist.length;
        let data = v.hist.map(v => v.pl).filter((v, i) => i > length - 60);
        data.push(v.pc);
        let canvas = document.getElementById('v60d' + v.inscode);
        this.Plot(
          'v60d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#000000',
          },
        );
      });

    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
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
          {
            color: '#0000FF',
          },
        );
      });

    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.hist)
      .forEach((v, i) => {
        let data = v.hist.map(v => v.pl).filter((v, i) => i > length - 250);
        data.push(v.pc);
        let canvas = document.getElementById('v360d' + v.inscode);
        this.Plot(
          'v360d' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#000000',
          },
        );
      });

    //hn
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.ctHist)
      .forEach((v, i) => {
        let data = v.ctHist.map(v2 => v2[1]).reverse();
        data.push(v.Buy_CountN);
        let canvas = document.getElementById('hn' + v.inscode);
        this.Plot(
          'hn' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            minMaxFlag: 1,
          },
        );
      });

    //hv
    allRows
      .filter((v1, i1) => v1.l18 && v1.l18.match(/^([^0-9]*)$/))
      .filter(v => v.ctHist)
      .forEach((v, i) => {
        let data = v.ctHist.map(v2 => v2[5]).reverse();
        data.push(v.Buy_N_Volume);
        let canvas = document.getElementById('hv' + v.inscode);
        this.Plot(
          'hv' + v.inscode.toString(),
          data,
          canvasMargin * canvas.height,
          canvas.height,
          {
            color: '#003300',
          },
        );
      });

    console.log('Start of datatable = ');
    console.time('datatable');
    table = $('#table').DataTable({
      order: [[1, 'desc']],
      pageLength: 10,
      scrollX: true,
      bLengthChange: false,
      fixedColumns: {
        leftColumns: 1,
        rightColumns: 0,
      },
      dom: 'Bfrtip',
      buttons: [],
      columns: [
        {name: 'name'},
        {name: 'pe'},
        {name: 'tg'}, //taghire payani
        {name: 'sw'}, //navasan
        {name: 'v'},
        {name: 'bs'},
        {name: 'col-salary'},
        {name: 'col-office'},
        {name: 'col-extn'},
        {name: 'col-email'},
        {name: 'col-name'},
        {name: 'col-position'},
        {name: 'col-salary'},
        {name: 'col-office'},
        {name: 'col-extn'},
        {name: 'col-email'},
        {name: 'col-name'},
        {name: 'col-position'},
        {name: 'col-salary'},
        {name: 'col-office'},
        {name: 'col-extn'},
        {name: 'col-email'},
      ],
    });
    console.timeEnd('datatable');
    //$('#table tbody tr').on('click', function(event) {
    //  let t = $(this).hasClass('row_selected');
    //  $('#table tbody tr').removeClass('row_selected');
    //  if (t) {
    //    $(this).removeClass('row_selected');
    //  } else {
    //    $(this).addClass('row_selected');
    //  }
    //});

    $('table> tbody> tr> td> div>a').on('mousedown', function(event) {
      let t = $(this).text();
      let p = table
        .column(0, {search:'applied'})
        .data()
        .map((v, i) => {
          iterateList[i] = v.match(/href="\/(.*)" t/)[1].replace(/ /g, '');
        });
      console.log("iterateList = ", iterateList);
      let iterateListIndex = iterateList.findIndex(v => v == t);
      console.log('iterateListIndex = ', iterateListIndex);
      localStorage.setItem('iterateList', JSON.stringify(iterateList));
      localStorage.setItem(
        'iterateListIndex',
        JSON.stringify(iterateListIndex),
      );
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
    this.GetCurRows();
    portfo = LoadPortfo();

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
          {CreateTable(allRows)}
          <br />
          <br />
          <div style={{textAlign: 'center'}}>
            <span
              style={{
                fontFamily: 'Courier New, Courier, monospace',
              }}>
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
function GetMM(v) {
  if (v.hist) {
    let histData = v.hist.map(v => v.pl).reverse();

    let max = Math.max(...histData.slice(0, 60));
    v.pc <= max
      ? (v.mm = numeral(-((max - v.pc) / max) * 100).format())
      : (v.mm = 0);

    max = Math.max(...histData.slice(0, 250));
    v.pc <= max
      ? (v.mmY = numeral(-((max - v.pc) / max) * 100).format())
      : (v.mmY = 0);
  } else {
    v.mm = 0;
    v.mmY = 0;
  }
}

function GetBazdeh(v) {
  if (v.hist) {
    let data = v.hist.map(v => v.pl);
    let len = v.hist.length;

    let n = len - 250;
    if (data[n]) {
      let val = -(((data[n] - v.pc) / data[n]) * 100);
      if (true) {
        val = Math.round(val);
      }
      v.d360 = val;
    } else {
      v.d360 = 'N';
    }

    n = len - 60;
    if (data[n]) {
      let val = -(((data[n] - v.pc) / data[n]) * 100);
      if (true) {
        val = Math.round(val);
      }
      v.d60 = val;
    } else {
      v.d60 = 'N';
    }

    n = len - 30;
    if (data[n]) {
      let val = -(((data[n] - v.pc) / data[n]) * 100);
      if (true) {
        val = Math.round(val);
      }
      v.d30 = val;
    } else {
      v.d30 = 'N';
    }

    n = len - 10 - 1;
    if (data[n]) {
      let val = -(((data[n] - v.pc) / data[n]) * 100);
      if (true) {
        val = Math.round(val);
      }
      v.d10 = val;
    } else {
      v.d10 = 'N';
    }

    n = len - 5;
    if (data[n]) {
      let val = -(((data[n] - v.pc) / data[n]) * 100);
      if (true) {
        val = Math.round(val);
      }
      v.d5 = val;
    } else {
      v.d5 = 'N';
    }
  }
}
export {Table, curRows, tableThis, table, columns, portfo, CreateTable};
