import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as XLSX from '../node_modules/xlsx/dist/xlsx.min.js';
import {table} from './Table.jsx';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {makeStyles} from '@material-ui/core/styles';
import './settings.css';

var portfoo = {test: 1};

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {portfoSnakebarSuccess: false, portfoSnakebarError: false};
  }

  SavePortfo = portfo => {
    try {
      const serializedState = JSON.stringify(portfo);
      console.log('serializedState = ', serializedState);
      localStorage.setItem('portfo', serializedState);
      this.setState({portfoSnakebarSuccess: true});
    } catch (err) {
      console.log('portfo4 = ', portfo);
      this.setState({portfoSnakebarError: true});
      return undefined;
    }
  };

  handleClose = (event, reason) => {
    console.log('reason = ', reason);
    if (reason === 'clickaway') {
      return;
    }
    this.setState({portfoSnakebarSuccess: false, portfoSnakebarError: false});
  };

  render() {
    console.log('settings render')
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
              try {
                var data = new Uint8Array(e.target.result);
                var wb = XLSX.read(data, {type: 'array'});
                var ws = wb.Sheets[wb.SheetNames[0]];
                var data = XLSX.utils.sheet_to_json(ws, {raw: true, header: 1});

                data.shift();
                portfoo = data.map(v => ({symbol: v[0], num: v[1], miyanginGh : v[6]}));

                this.SavePortfo(portfoo);
              } catch (e) {
                this.setState({portfoSnakebarError: true});
              }
            };
            e.target.value = '';
          }}
        />

        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            style={{backgroundColor: '#007bff', color: 'white'}}>
            Upload portfo (excel)
          </Button>
        </label>

        <br />
        <br />
        <div dir="RTL">
          <ul dir="RTL" className="b" style={{textAlign: 'right'}}>
            <li>
              در حال حاضر تنها وارد کردن پورتفو از کارگزاری مفید ممکن است.
            </li>

            <li>
              برای این منظور ابتدا از سایت{' '}
              <a href="https://onlineplus.mofidonline.com/Home/RealtimePortfolioAdvanced">
                {' '}
                modifonline
              </a>{' '}
              در قسمت پورتفو فایل اکسل پورتفو خود را دانلود کنید و آن را وارد
              کنید.
            </li>
            <li>پس از وارد کردن پورتفو صفحه را رفرش کنید.</li>
            <li>
              پورتفو در مرورگر خودتان ذخیره می شود بنابراین نیاز نیست هر بار این
              کار را انجام دهید.
            </li>
          </ul>
        </div>

        <Snackbar
          open={this.state.portfoSnakebarSuccess}
          autoHideDuration={3000}
          onClose={this.handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={this.handleClose}>
            {portfoo
              ? portfoo.length + ' symbols imported'
              : null}
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.portfoSnakebarError}
          autoHideDuration={3000}
          onClose={this.handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={this.handleClose}>
            Error
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}
export {Setting};
