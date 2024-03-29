import React from 'react';
import ReactDOM from 'react-dom';
import {Filter, filters} from './Filter.jsx';
import {Header} from './Header.jsx';
import {Help} from './Help.jsx';
import {Setting} from './Settings.jsx';
import {Instruments} from './Instruments.js';
import {Portfo} from './Portfo.jsx';
import {Table, table} from './Table.jsx';

let filterStyle,
  tableStyle,
  helpStyle,
  settingStyle,
  instrumentStyle,
  portfoStyle;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'table',
      filtersEn: 1,
    };
  }

  ChangeMode = mode => {
    let iterateList = [];
    if (mode == 'table') {
      if (this.state.filtersEn) {
        $.fn.dataTable.ext.search = filters
          .filter(v => v.exist)
          .map(v => v.func);
      }
      this.setState({mode: mode}, () => {
        table.draw();

        $('table> tbody> tr> td> div>a').on('mousedown', function(event) {
          let t = $(this).text();
          let p = table
            .column(0, {search: 'applied'})
            .data()
            .map((v, i) => {
              iterateList[i] = v.match(/href="\/(.*)" t/)[1].replace(/ /g, '');
            });
          console.log('iterateList = ', iterateList);
          let iterateListIndex = iterateList.findIndex(v => v == t);
          console.log('iterateListIndex = ', iterateListIndex);
          localStorage.setItem('iterateList', JSON.stringify(iterateList));
          localStorage.setItem(
            'iterateListIndex',
            JSON.stringify(iterateListIndex),
          );
        });
      });
    } else if (mode == 'filter') {
      this.setState({mode: mode});
    } else if (mode == 'help') {
      this.setState({mode: mode});
    } else if (mode == 'setting') {
      this.setState({mode: mode}, () => console.log(mode));
    } else if (mode == 'instrument') {
      this.setState({mode: mode}, () => console.log(mode));
    } else if (mode == 'portfo') {
      this.setState({mode: mode}, () => console.log(mode));
    }
  };

  SetStyles = mode => {
    filterStyle = {display: 'none'};
    tableStyle = {display: 'none'};
    helpStyle = {display: 'none'};
    instrumentStyle = {display: 'none'};
    settingStyle = {display: 'none'};
    portfoStyle = {display: 'none'};

    if (mode == 'table') {
      tableStyle = {display: 'block'};
    } else if (mode == 'filter') {
      filterStyle = {display: 'block'};
    } else if (mode == 'help') {
      helpStyle = {display: 'block'};
    } else if (mode == 'setting') {
      settingStyle = {display: 'block'};
    } else if (mode == 'instrument') {
      instrumentStyle = {display: 'block'};
    } else if (mode == 'portfo') {
      portfoStyle = {display: 'block'};
    }
  };

  DisableFilters = () => {
    $.fn.dataTable.ext.search = [];
    this.setState({filtersEn: 0});
    table.draw();
  };

  EnableFilters = () => {
    $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
    this.setState({filtersEn: 1});
    table.draw();
  };

  componentDidMount() {
    console.log('main did mount');
  }
  render() {
    console.log('main render');
    if (table) table.draw();
    this.SetStyles(this.state.mode);
    return (
      <div>
        <div style={tableStyle}>
          <Header
            ChangeMode={this.ChangeMode}
            DisableFilters={this.DisableFilters}
            EnableFilters={this.EnableFilters}
            badge={
              this.state.filtersEn ? filters.filter(v => v.exist).length : 0
            }
            filtersEn={this.state.filtersEn}
          />
          <Table />
        </div>
        <div style={filterStyle}>
          <Filter ChangeMode={this.ChangeMode} />
        </div>
        <div style={helpStyle}>
          <Help ChangeMode={this.ChangeMode} />
        </div>
        <div style={settingStyle}>
          <Setting ChangeMode={this.ChangeMode} />
        </div>
        <div style={instrumentStyle}>
          <Instruments ChangeMode={this.ChangeMode} />
        </div>
        <div style={portfoStyle}>
          <Portfo styl={portfoStyle} ChangeMode={this.ChangeMode} />
        </div>
      </div>
    );
  }
}

function crossDomainPost() {
  // Add the iframe with a unique name
  var iframe = document.createElement('iframe');
  var uniqueString = 'CHANGE_THIS_TO_SOME_UNIQUE_STRING';
  document.body.appendChild(iframe);
  iframe.style.display = 'none';
  iframe.contentWindow.name = uniqueString;

  // construct a form with hidden inputs, targeting the iframe
  var form = document.createElement('form');
  form.target = uniqueString;
  form.action = 'http://filterbourse.gigfa.com/w.php';
  form.method = 'GET';

  // repeat for each parameter
  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'INSERT_YOUR_PARAMETER_NAME_HERE';
  input.value = 'INSERT_YOUR_PARAMETER_VALUE_HERE';
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
}
crossDomainPost();

export {Main};
