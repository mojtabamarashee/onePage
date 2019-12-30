import React from 'react';
import ReactDOM from 'react-dom';
import Badge from '@material-ui/core/Badge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

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
						onClick={() => this.props.ChangeMode('settings')}
						icon={faFilter}
						size="3x"
						color="lightBlue"
					/>
				</Badge>
				<FontAwesomeIcon
					style={{margin: '0 0 5px 0', float: 'right'}}
					onClick={() => this.props.ChangeMode('help')}
					icon={faQuestionCircle}
					size="3x"
					color="lightBlue"
				/>
			</div>
		);
	}
}
export {Header};
