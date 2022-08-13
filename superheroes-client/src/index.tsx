import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import { App } from './App';
import { store } from './store';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ADDRESS;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

Modal.setAppElement('#root');

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
