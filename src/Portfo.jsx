import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {forwardRef} from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {makeStyles} from '@material-ui/core/styles';
import _ from 'lodash';
var numeral = require('numeral');
let t;
numeral.defaultFormat('0,0.[00]');

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
let portfo = LoadPortfo();

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
class Portfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {portfo: []};
  }

  GetPlosingInterval = () => {
    let portfo = _.cloneDeep(this.state.portfo);
    this.state.portfo.map((v, i) => {
      fetch('/' + v.symbol)
        .then(res => res.json())
        .then(
          result => {
            portfo[i].gheymat = result.pl;
            if (JSON.stringify(portfo) != JSON.stringify(this.state.portfo)) {
              this.setState({portfo: portfo});
            }
          },
          error => {
            console.log('error = ', v.symbol +  ':::' + result + '::::' + error);
          },
        );
    });
    //if (JSON.stringify(portfo) != JSON.stringify(this.state.portfo))
    {
      this.setState({portfo: portfo});
    }
  };

  componentWillMount() {
    let portfo = LoadPortfo();
    this.setState({portfo: portfo});
  }
  componentDidMount() {
    //this.props.styl.display == 'none' ? (interval = 10000000) : (interval = 1000);
    //console.log('interval = ', interval);
    setInterval(this.GetPlosingInterval, 5000);
  }

  render() {
    let v = this.props.v;
    console.log('portfo render');
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
        <MaterialTable
          icons={tableIcons}
          title="Basic Portfo"
          columns={[
            {
              title: 'نماد',
              field: 'symbol',
              cellStyle: {
                backgroundColor: '#039be5',
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: '16px',
                position: 'sticky',
                left: '0',
                zIndex: '999',
                padding: '3px',
              },
              headerStyle: {
                backgroundColor: '#039be5',
                fontFamily: 'Courier New, Courier, monospace',
                fontWeight: 'bold',
                fontSize: '16px',
                position: 'sticky',
                left: '0',
                zIndex: '999',
              },
            },
            {title: 'تعداد', field: 'num'},
            {title: 'قیمت.پ', field: 'gheymat'},
            {title: 'ق.م', field: 'miyanginGh'},
            {
              title: 'ارزش',
              field: 'arzesh',
              customSort: (a, b) =>
                a.arzesh.toString().replace(/,/g, '') -
                b.arzesh.toString().replace(/,/g, ''),
            },
            {
              title: 'سود',
              field: 'sood',
              customSort: (a, b) =>
                a.sood.toString().replace(/,/g, '') -
                b.sood.toString().replace(/,/g, ''),
            },
            {title: 'تعداد', field: 'test7'},
            {title: 'تعداد', field: 'test8'},
          ]}
          data={
            this.state.portfo && this.state.portfo.length > 1
              ? this.state.portfo.map((row, i) => ({
                  symbol: row.symbol,
                  num: row.num,
                  gheymat: row.gheymat,
                  miyanginGh: row.miyanginGh,
                  get arzesh() {
                    return numeral(this.gheymat * this.num).format();
                  },
                  get sood() {
                    return numeral(
                      this.arzesh.toString().replace(/,/g, '') -
                        this.num * this.miyanginGh,
                    ).format();
                  },
                }))
              : [{symbol: 'Nan', num: 'Nan'}]
          }
          options={{
            sorting: true,
            pageSize: 10,
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF',
            },
          }}
        />
      </div>
    );
  }
}
export {Portfo};
