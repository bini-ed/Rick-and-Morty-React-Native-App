import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from '../store/reducer';
import apiCall from './middleware/apiCallMiddleware';

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    apiCall,
  ],
});
export default store;
