import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';


import Home from './Home.jsx';

const element = (
  <Router>
    <Home />
  </Router>
);

ReactDOM.render(element, document.getElementById('root'));
