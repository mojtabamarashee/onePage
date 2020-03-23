import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {curRows, tableThis, table, columns} from './Table.jsx';
import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Badge from '@material-ui/core/Badge';
let selectedCs = 'none';
let priceMinVal, priceMaxVal;
let filters = [];
let kafeGheymat, volumeMoreThan, dargir;
let that;

filters.push({
  exist: 0,
  name: 'PayaniPos',

  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row && row.pcp >= 0) {
      return true;
    }
    return false;
  },
});

filters.push({
  exist: 0,
  name: 'PayaniNeg',

  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row && row.pcp < 0) {
      return true;
    }
    return false;
  },
});

filters.push({
  exist: 0,
  name: 'PEPos',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      if (row.pe > 0) {
        return true;
      }
      return false;
    }
  },
});

filters.push({
  exist: 0,
  name: 'HajmBishtarAzMiayn',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      if (row.av30 > v.tvol) {
        return true;
      }
      return false;
    }
  },
});

filters.push({
  exist: 0,
  name: 'SafeKharid',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r =
        Math.round(row.pd1) == Math.round(row.tmax) && row.qd1 > 0
          ? true
          : false;
      return r;
    } else return false;
  },
});

filters.push({
  exist: 0,
  name: 'NoSandugh',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r = row.cs != 68 ? true : false;
      return r;
    } else return false;
  },
});

filters.push({
  exist: 0,
  name: 'GhodrateKharidarBishtar',
  func: (settings, data, dataIndex) => {
    var columns = table.settings().init().columns;
    var bs = parseFloat(data[columns.findIndex(v => v.name == 'bs')]) || 0;
    let r;
    bs > 1 ? (r = true) : (r = false);
    return r;
  },
});

filters.push({
  exist: 0,
  name: 'SafeKharidNabashad',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r =
        Math.round(row.pd1) == Math.round(row.tmax) && row.qd1 > 0
          ? false
          : true;
      return r;
    } else return false;
  },
});

filters.push({
  exist: 0,
  name: 'SafeForoushNabashad',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r =
        Math.round(row.po1) == Math.round(row.tmin) && row.qd1 == 0
          ? false
          : true;
      return r;
    } else return false;
  },
});

filters.push({
  exist: 0,
  name: 'SafeForoush',
  func: (settings, data, dataIndex, obj) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r =
        Math.round(row.po1) == Math.round(row.tmin) && row.qd1 == 0
          ? true
          : false;
      return r;
    } else return false;
  },
});

filters.push({
  exist: 0,
  name: 'SafeForoushNabashad',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    if (row) {
      let r =
        Math.round(row.po1) == Math.round(row.tmin) && row.qd1 == 0
          ? false
          : true;
      return r;
    } else return false;
  },
});
filters.push({
  exist: 0,
  name: 'PESmallerThanSec',
  func: (settings, data, dataIndex) => {
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    var pe = row.pe || 0;
    var secPe = row.sectorPE || 0;
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
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    var pe = row.pe || 0;
    var secPe = row.sectorPE || 0;
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
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
    var rsi = parseFloat(row.rsi) || 0;
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
    var row = allRows.find(v => v.name == data[0].split('___')[1]);
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
  name: 'KafeGheymat',
  func: (settings, data, dataIndex) => {
    var v = allRows.find(v => v.name == data[0].split('___')[1]);
    if (v) {
      if (v.pClosingHist && v.pClosingHist[kafeGheymat]) {
        let hist = v.pClosingHist.slice(0, kafeGheymat);
        let r;
        v.pc <= Math.min(...hist) * 1.02 ? (r = true) : (r = false);
        return r;
      }
    }
    return false;
  },
});

filters.push({
  exist: 0,
  name: 'VolumeMoreThan',
  func: (settings, data, dataIndex) => {
    var v = allRows.find(v => v.name == data[0].split('___')[1]);
    if (v && v.name == 'فوکا') {
    }
    if (v && v.av30) {
      if (v.tvol >= volumeMoreThan * v.av30) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  },
});

filters.push({
  exist: 0,
  name: 'Dargir',
  func: (settings, data, dataIndex) => {
    var v = allRows.find(v => v.name == data[0].split('___')[1]);
    if (v && v.av30) {
      let avg =
        v.pClosingHist
          .filter((v, i) => i < dargir)
          .reverse()
          .reduce((p, c) => p + c, 0) / dargir;
      if (v.pc <= avg + 0.02 * v.pc) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  },
});

filters.push({
  exist: 0,
  name: 'PriceLimit',
  func: (settings, data, dataIndex) => {
    var p = allRows.find(v => v.name == data[0].split('___')[1]);
    if (p.pc < priceMaxVal && p.pc > priceMinVal) {
      return true;
    }
    return false;
  },
});

class Filter extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      priceFilterEn: 0,
      searchResultNum: null,
    };
  }

  //GetColumnIndex = name => {
  //	let index = table.columns().map((v, i) => {
  //		let columnss = table.settings().init().columns[0];
  //		console.log('columnss = ', columnss);
  //		if (columns[index].name == name) {
  //			console.log('name = ', name);
  //			console.log('i = ', i);
  //			return i;
  //		}
  //	});
  //	return index;
  //};

  PayaniPos = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'PayaniPos').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'PayaniPos').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  PayaniNeg = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'PayaniNeg').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'PayaniNeg').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  PEPos = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'PEPos').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'PEPos').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  GhodrateKharidarBishtar = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'GhodrateKharidarBishtar').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'GhodrateKharidarBishtar').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  NoSandugh = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'NoSandugh').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'NoSandugh').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  SafeKharid = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'SafeKharid').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'SafeKharid').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  SafeKharidNabashad = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'SafeKharidNabashad').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'SafeKharidNabashad').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  SafeForoush = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'SafeForoush').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'SafeForoush').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  SafeForoushNabashad = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'SafeForoushNabashad').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'SafeForoushNabashad').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  PESmallerThanSec = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'PESmallerThanSec').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'PESmallerThanSec').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  PESmallerThanHalfSec = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'PESmallerThanHalfSec').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'PESmallerThanHalfSec').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  RsiLessThan = () => e => {
    if (e.target.checked) {
      filters.find(v => v.name == 'RsiLessThan').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'RsiLessThan').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  CsSelected = e => {
    selectedCs = e.target.value;
      console.log("selectedCs = ", selectedCs);
    if (selectedCs != 'none') {
      filters.find(v => v.name == 'CsSelected').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'CsSelected').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  KafeGheymatChanged = e => {
    kafeGheymat = e.target.value;
    if (kafeGheymat != 0) {
      filters.find(v => v.name == 'KafeGheymat').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'KafeGheymat').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  VolumeMoreThanChanged = e => {
    volumeMoreThan = e.target.value;
    if (volumeMoreThan != 0) {
      filters.find(v => v.name == 'VolumeMoreThan').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'VolumeMoreThan').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  Dargir = e => {
    dargir = e.target.value;
    console.log('dargir = ', dargir);
    if (dargir != 0) {
      filters.find(v => v.name == 'Dargir').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      filters.find(v => v.name == 'Dargir').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  PriceEn = e => {
    if (e.target.checked) {
      this.setState({priceFilterEn: 1});
      filters.find(v => v.name == 'PriceLimit').exist = 1;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    } else {
      this.setState({priceFilterEn: 0});
      filters.find(v => v.name == 'PriceLimit').exist = 0;
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      table.draw();
      this.setState({searchResultNum: table.page.info().recordsDisplay});
    }
  };

  onChangeMinP = e => {
    priceMinVal = Number(e.target.value);
    $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
    table.draw();
    this.setState({searchResultNum: table.page.info().recordsDisplay});
  };

  onChangeMaxP = e => {
    priceMaxVal = Number(e.target.value);
    $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
    table.draw();
    this.setState({searchResultNum: table.page.info().recordsDisplay});
  };

  render() {
    return (
      <div style={{margin: '5px'}}>
        <Badge
          showZero
          style={{margin: '10px 0 0 0'}}
          badgeContent={this.state.searchResultNum}
          color="primary">
          <FontAwesomeIcon
            onClick={() => this.props.ChangeMode('table')}
            calssName={'mr-3'}
            icon={faLongArrowAltLeft}
            size="4x"
            color="black"
          />
        </Badge>
        <br />
        <div dir="RTL">
          <table style={{float: 'right'}}>
            <tr>
              <td>
                <FormControlLabel
                  control={
                    <Checkbox
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
              </td>
              <td>
                <FormControlLabel
                  control={
                    <Checkbox
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
              </td>
            </tr>
            <tr>
              <td>
                <FormControlLabel
                  control={
                    <Checkbox
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
              </td>
              <td>
                <FormControlLabel
                  control={
                    <Checkbox
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
              </td>
            </tr>
          </table>
        </div>
        <br />
        <p style={{clear: 'right'}} />
        <p style={{clear: 'right'}} />
        <div style={{float: 'right'}}>
          <TextField
            select
            label="Select"
            id="filled-select-currency"
            onChange={this.CsSelected}
            helperText="Please select cs"
            style={{width: '300px'}}
            variant="filled">
            {csName.map((value, i) => (
              <MenuItem
                key={value}
                value={csNameOrig[i]}
                style={{fontFamily: 'Courier New, Courier, monospace'}}>
                {value.toString() +
                  ' (' +
                  allRows
                    .filter(v => v.l18)
                    .filter((v, i) => v.l18 && v.l18.match(/^([^0-9]*)$/))
                    .filter(v => v.csName == csNameOrig[i]).length +
                  ')'}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <br />
        <br />

        <p style={{clear: 'right'}} />
        <div style={{float: 'right'}}>
          <input
            disabled={this.state.priceFilterEn ? '' : 'disabled'}
            onChange={this.onChangeMinP}
            type="text"
            id="outlined-basic"
            label="min"
            variant="outlined"
            style={{width: '70px'}}
          />

          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {' < قیمت < '}
          </span>
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
            style={{margin: '0 0 0 0px'}}
            control={
              <Checkbox
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
        </div>

        <br />
        <br />
        <p style={{clear: 'right'}} />
        <div style={{float: 'right'}}>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {' کف قیمت '}
          </span>
          <TextField
            select
            id="filled-select-currency"
            inputProps={{
              style: {
                height: '5%',
              },
            }}
            onChange={this.KafeGheymatChanged}
            variant="filled">
            {[0, 2, 5, 10, 20, 30].map((value, i) => (
              <MenuItem key={value} style={{height: '10%'}} value={value}>
                {value.toString()}
              </MenuItem>
            ))}
          </TextField>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {' روزه '}
          </span>
        </div>

        <br />
        <p style={{clear: 'right'}} />
        <table style={{float: 'right'}}>
          <tr>
            <td>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.SafeKharid()}
                    value="gilad"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    style={{fontFamily: 'Courier New, Courier, monospace'}}>
                    صف خرید باشد
                  </Typography>
                }
              />
            </td>
            <td>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.SafeKharidNabashad()}
                    value="gilad"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    style={{fontFamily: 'Courier New, Courier, monospace'}}>
                    صف خرید نباشد
                  </Typography>
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.SafeForoush()}
                    value="gilad"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    style={{fontFamily: 'Courier New, Courier, monospace'}}>
                    صف فروش باشد
                  </Typography>
                }
              />
            </td>
            <td>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.SafeForoushNabashad()}
                    value="gilad"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    style={{fontFamily: 'Courier New, Courier, monospace'}}>
                    صف فروش نباشد
                  </Typography>
                }
              />
            </td>
          </tr>
        </table>
        <p style={{clear: 'right'}} />
        <FormControlLabel
          style={{float: 'right'}}
          control={
            <Checkbox
              onChange={this.GhodrateKharidarBishtar()}
              value="gilad"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
              color="primary"
            />
          }
          label={
            <Typography style={{fontFamily: 'Courier New, Courier, monospace'}}>
              قدرت خریدار بیشتر از فروشنده
            </Typography>
          }
        />
        <p style={{clear: 'right'}} />
        <FormControlLabel
          style={{float: 'right'}}
          control={
            <Checkbox
              onChange={this.PayaniPos()}
              value="gilad"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
              color="primary"
            />
          }
          label={
            <Typography style={{fontFamily: 'Courier New, Courier, monospace'}}>
              پایانی +
            </Typography>
          }
        />

        <FormControlLabel
          style={{float: 'right'}}
          control={
            <Checkbox
              onChange={this.PayaniNeg()}
              value="gilad"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
              color="primary"
            />
          }
          label={
            <Typography style={{fontFamily: 'Courier New, Courier, monospace'}}>
              پایانی -
            </Typography>
          }
        />
        <p style={{clear: 'right'}} />
        <FormControlLabel
          style={{float: 'right'}}
          control={
            <Checkbox
              onChange={this.NoSandugh()}
              value="gilad"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
              color="primary"
            />
          }
          label={
            <Typography style={{fontFamily: 'Courier New, Courier, monospace'}}>
              عدم نمایش صندوق ها
            </Typography>
          }
        />

        <p
          style={{
            clear: 'right',
            margin: '0',
          }}
        />
        <div style={{float: 'right'}}>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {'حجم بیشتر از'}
          </span>
          <TextField
            select
            id="filled-select-currency"
            inputProps={{
              style: {
                height: '5%',
              },
            }}
            onChange={this.VolumeMoreThanChanged}
            style={{margin: '5px'}}
            variant="filled">
            {[0, 1, 2, 3, 4, 5, 10, 20, 30, 50, 100].map((value, i) => (
              <MenuItem key={value} style={{height: 'px'}} value={value}>
                {value.toString()}
              </MenuItem>
            ))}
          </TextField>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {'برابر  میانگن ماه'}
          </span>
        </div>

        <p style={{clear: 'right'}} />
        <div style={{float: 'right'}}>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {'قیمت پایانی مساوی میانگین'}
          </span>
          <TextField
            select
            id="filled-select-currency"
            inputProps={{
              style: {
                height: '5%',
              },
            }}
            style={{margin: '5px'}}
            onChange={this.Dargir}
            variant="filled">
            {[0, 10, 20, 30, 50, 100, 150, 200, 250].map((value, i) => (
              <MenuItem key={value} style={{margin: '5px'}} value={value}>
                {value.toString()}
              </MenuItem>
            ))}
          </TextField>
          <span style={{fontFamily: 'Courier New, Courier, monospace'}}>
            {'روز قبل'}
          </span>
        </div>
      </div>
    );
  }
}
export {Filter, filters, that};
