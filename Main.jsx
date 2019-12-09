
import React from 'react';

import ReactDOM from 'react-dom';

class Main extends React.Component {
	constructor(props) {
		super(props);
	
	}
	
	render() {
		return (
			<div id="mainDiv">
				sdss
			</div>
		);
	}
}

export {Main}





//
//
//
//import React from 'react';
//import {useState, useMemo} from 'react';
//import ReactDOM from 'react-dom';
//import Debug from './Debug';
//import {Mode} from './Mode.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import {Log} from './Log.js';
////let that;
//function Main(props) {
//	const [Childs, setChilds] = useState([
//		<Mode key="mode" name="mode" AddChild={AddChild} RemoveChild={RemoveChild} />,
//	]);
//
//	function AddChild(Child) {
//        let t = _.cloneDeep(Childs);
//        t.push(Child);
//		setChilds(t);
//		console.log('Childs = ', Childs);
//	}
//
//	function RemoveChild(Child) {}
//
//	const GetChilds = () => Childs;
//
//	return( 
//		<div id="mainDiv">
//			<GetChilds />
//		</div>
//	);
//}
//
//export {Main};



