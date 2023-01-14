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
import { UploadUserPhotoModalProvider } from './context/UploadUserPhotoModal';
import { BookingsDatesModalProvider } from './context/BookingDatesModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <BookingsDatesModalProvider>
        <UploadUserPhotoModalProvider>
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
        </UploadUserPhotoModalProvider>
      </BookingsDatesModalProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
