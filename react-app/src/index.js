import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { DeleteModalProvider } from './context/DeleteModal';
import { EditModalProvider } from './context/EditModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
    <DeleteModalProvider>
    <EditModalProvider>
    <Provider store={store}>
        <App />
      </Provider>
      </EditModalProvider>
      </DeleteModalProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
