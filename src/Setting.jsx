import React from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {curRows, tableThis} from './Table.jsx';
class Settings extends React.Component {
	PEPos = () => e => {
		tableThis.setState({PEPosFlag: e.target.checked}, () => console.log('state = ', tableThis.state));
	};

	PESmallerThanSec = () => e => {
		tableThis.setState({PESmallerThanSecFlag: e.target.checked}, () => console.log('state = ', tableThis.state));
	};

	render() {
		return (
			<div style={{margin: '5px'}}>
				<FontAwesomeIcon
					onClick={() => this.props.ChangeMode('settings')}
					icon={faLongArrowAltLeft}
					size="4x"
					color="black"
				/>
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
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
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
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
			</div>
		);
	}
}
export {Settings};
