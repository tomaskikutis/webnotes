import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import App from './App';
import './index.css';

ReactDOM.render(
  <Store App={App}></Store>,
  document.getElementById('root')
);
