import React from 'react';
import ReactDOM from 'react-dom';
import {Settings, filters} from './Setting.jsx';
import {Header} from './Header.jsx';
import {Help} from './Help.jsx';
import {Table, table} from './Table.jsx';

let settingStyle, tableStyle, helpStyle;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'table',
      filtersEn: 1,
    };
  }

  ChangeMode = mode => {
    if (mode == 'table') {
      $.fn.dataTable.ext.search = filters.filter(v => v.exist).map(v => v.func);
      this.setState({mode: mode}, () => table.draw());
    } else if (mode == 'settings') {
      this.setState({mode: mode});
    } else if (mode == 'help') {
      this.setState({mode: mode});
    }
  };

  SetStyles = mode => {
    if (mode == 'table') {
      settingStyle = {display: 'none'};
      tableStyle = {display: 'block'};
      helpStyle = {display: 'none'};
    } else if (mode == 'settings') {
      tableStyle = {display: 'none'};
      settingStyle = {display: 'block'};
      helpStyle = {display: 'none'};
    } else if (mode == 'help') {
      tableStyle = {display: 'none'};
      settingStyle = {display: 'none'};
      helpStyle = {display: 'block'};
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

  render() {
    if (table) table.draw();
    this.SetStyles(this.state.mode);
    return (
      <div>
        <div style={tableStyle}>
          <Header
            ChangeMode={this.ChangeMode}
            DisableFilters={this.DisableFilters}
            EnableFilters={this.EnableFilters}
            badge={this.state.filtersEn ? filters.filter(v => v.exist).length : 0}
            filtersEn={this.state.filtersEn}
          />
          <Table />
        </div>
        <div style={settingStyle}>
          <Settings ChangeMode={this.ChangeMode} />
        </div>
        <div style={helpStyle}>
          <Help ChangeMode={this.ChangeMode} />
        </div>
      </div>
    );
  }
}
export {Main};
