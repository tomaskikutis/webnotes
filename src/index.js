import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import App from './App';

navigator.serviceWorker.register('serviceWorker.js');

ReactDOM.render(
  <Store App={App}></Store>,
  document.getElementById('root')
);
