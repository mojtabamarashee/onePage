import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class Settings extends React.Component {
	render() {
		return (
			<div>
				<FontAwesomeIcon onClick={()=>this.props.ChangeMode("settings")} icon={faArrowLeft} size="3x" color="lightBlue"/>
				<input type="checkbox" id="pc+" onclick="myFunction()"/>
					pe +
			</div>
		);
	}
}
export {Settings};
