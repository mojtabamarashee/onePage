import React from 'react';
import ReactDOM from 'react-dom';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {cs} from './CS.js';
import {csName, csNameOrig} from './CsName.js';
import {CreateTable} from './Table.jsx';
var numeral = require('numeral');

class Instru extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var table = $('#table').DataTable({
      order: [[1, 'desc']],
      pageLength: 10,
      scrollX: true,
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
  }

  render() {
    console.log('props = ', this.props.cs);
    return CreateTable(allRows.filter(({cs}) => cs == this.props.cs));
  }
}
export {Instru};
