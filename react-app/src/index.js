import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { SpotProvider } from './context/SpotContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <SpotProvider>
    <ModalProvider>
    <Provider store={store}>
        <App />
      </Provider>
    </ModalProvider>
    </SpotProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
