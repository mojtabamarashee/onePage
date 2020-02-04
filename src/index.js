import React from 'react';
import ReactDOM from 'react-dom';
import {Main} from './Main.jsx';
import {SymbolPage} from './SymbolPage.jsx';
import {instruments} from './Instruments.js';
import {Instru} from './Instru.jsx';
import {Route, Link, HashRouter as Router} from 'react-router-dom';

const Routing = (
  <Router>
    <div>
      <Route exact path="/" component={Main} />
      {allRows.map((v, i) => (
        <Route path={'/' + v.name} render={() => <SymbolPage v={v} />} />
      ))}
      ,
      {instruments.map(v => (
        <Route path={'/' + v.nameOrig} render={() => <Instru cs={v.cs} />} />
      ))}
    </div>
  </Router>
);

ReactDOM.render(Routing, document.getElementById('root'));
