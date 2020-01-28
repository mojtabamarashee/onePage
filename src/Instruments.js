import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
var numeral = require('numeral');
import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';
import {Link} from 'react-router-dom';

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});

const ScaleG = num => {
  let in_min = 0,
    in_max = 100,
    out_min = 20,
    out_max = 100;
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
  );
};

const ScaleR = num => {
  let in_min = 0,
    in_max = 100,
    out_min = 40,
    out_max = 100;
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
  );
};

const FindSecAvg = csNameOrig => {
  let num = allRows
    .filter((v3, i) => v3.l18.match(/^([^0-9]*)$/))
    .filter(({csName}) => csName == csNameOrig);
  let coef;
  let secAvg =
    num.reduce((a, c) => {
      c.flow == 4 ? (coef = 5 / 3) : (coef = 1);
      return a + c.pcp * coef;
    }, 0) / num.length;
  return [secAvg, num.length];
};

let t, cntr, lG, lR;

const FindCs = v => {
    console.log("v = ", v);
  let t = allRows.find(v1 => v1.csName == v);
    console.log("t = ", t);
  let r = t ? t.cs : 0;
  return r;
};
let instruments = csNameOrig.map((v, i) => ({
  nameOrig: v,
  myName: csName[i],
  cs: FindCs(v),
  avg: FindSecAvg(v)[0],
  len: FindSecAvg(v)[1],
}));

console.log('instruments = ', instruments);
class Instruments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let rows = instruments
      .map(
        (v, i) => (
          (lG = ScaleG(Math.round(((5 - v.avg) * 100) / 5))),
          (lR = ScaleR(Math.round(((v.avg + 5) * 100) / 5))),
          (
            <td
              style={{
                textAlign: 'center',
                border: '1px solid black',
                fontFamily: 'Courier New, Courier, monospace',
                margin: '5px',
                fontSize: '13px',
                padding: '5px',
                backgroundColor:
                  v.avg > 0 ? `hsl(102, 99%, ${lG}%)` : `hsl(1, 99%, ${lR}%)`,
                color:
                  v.avg > 0
                    ? lG < 40
                      ? 'white'
                      : 'black'
                    : lR < 45
                    ? 'white'
                    : 'black',
              }}>
              <Link to={'/' + v.nameOrig } target="_blank" >{v.myName + '(' + v.len + ')'}</Link>
              <br />
              <span>{numeral(v.avg).format()}</span>
            </td>
          )
        ),
      )
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
        <table style={{margin: '2px'}} cellSpacing="10">
          {rows.map((row, i) => (
            <tr style={{height: '40px'}}>{row}</tr>
          ))}
        </table>
      </div>
    );
  }
}
export {Instruments, instruments};
