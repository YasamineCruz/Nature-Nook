import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { DeleteModalProvider } from './context/DeleteModal';
import { EditModalProvider } from './context/EditModal';
import { SignupModalProvider } from './context/SignupModal';
import { ReviewUpdateModalProvider } from './context/ReviewUpdateModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
    <SignupModalProvider>
    <DeleteModalProvider>
    <EditModalProvider>
    <ReviewUpdateModalProvider>
    <Provider store={store}>
        <App />
      </Provider>
      </ReviewUpdateModalProvider>
      </EditModalProvider>
      </DeleteModalProvider>
      </SignupModalProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
