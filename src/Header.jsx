import React from 'react';
import ReactDOM from 'react-dom';
import Badge from '@material-ui/core/Badge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import {
  faToggleOn,
  faToggleOff,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {Table, table} from './Table.jsx';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import PieChartIcon from '@material-ui/icons/PieChart';
import {green, purple, yellow, lime, grey} from '@material-ui/core/colors';
console.log('purple = ', purple);
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        <Badge badgeContent={this.props.badge} color="primary">
          <FontAwesomeIcon
            style={{margin: '10px 0 5px 0'}}
            onClick={() => this.props.ChangeMode('filter')}
            icon={faFilter}
            size="3x"
            color={this.props.filtersEn ? 'lightBlue' : 'gray'}
          />
        </Badge>
        {this.props.filtersEn ? (
          <FontAwesomeIcon
            style={{margin: '10px 0 5px 5px'}}
            onClick={() => {
              this.props.DisableFilters();
            }}
            icon={faToggleOn}
            size="2x"
            color="green"
          />
        ) : (
          <FontAwesomeIcon
            style={{margin: '10px 0 0px 0px'}}
            onClick={() => {
              this.props.EnableFilters();
            }}
            icon={faToggleOff}
            size="2x"
            color="red"
          />
        )}

        <span
          style={{
            fontSize: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontFamily: 'Courier New, Courier, monospace',
            fontWeight: 'bold',
            margin: '0 0 0 20px',
            background: 'lightgray',
            padding: '4px',
          }}>
          {date}
        </span>
        <FontAwesomeIcon
          style={{margin: '0 0 5px 0', float: 'right'}}
          onClick={() => this.props.ChangeMode('help')}
          icon={faQuestionCircle}
          size="2x"
          color="lightBlue"
        />
        <FontAwesomeIcon
          style={{margin: '0 10px 0 0', float: 'right'}}
          onClick={() => this.props.ChangeMode('setting')}
          icon={faCog}
          size="2x"
          color={grey[800]}
        />
        <PieChartIcon
          onClick={() => this.props.ChangeMode('portfo')}
          style={{
            margin: '0 10px 0 0',
            fontSize: '33',
            float: 'right',
            color: yellow[800],
          }}
        />
        <EmojiTransportationIcon
          onClick={() => this.props.ChangeMode('instru')}
          style={{
            color: purple[800],
            margin: '0 10px 0 0',
            fontSize: '33',
            float: 'right',
          }}
        />
      </div>
    );
  }
}
export {Header};
