import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {forwardRef} from 'react';
console.log('portfo2 = ', portfo);
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
console.log('portfo3 = ', portfo);

class Portfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let v = this.props.v;

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };

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
            {title: 'نماد', field: 'test2'},
            {title: 'نماد', field: 'test3'},
            {title: 'تعداد', field: 'test4'},
            {title: 'تعداد', field: 'test5'},
            {title: 'تعداد', field: 'test6'},
            {title: 'تعداد', field: 'test7'},
            {title: 'تعداد', field: 'test8'},
          ]}
          data={
            portfo && portfo.length > 1
              ? portfo.map((row, i) => ({
                  symbol: row.symbol,
                  num: row.num,
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
