import {combineReducers} from '@reduxjs/toolkit';
import characterReducer from './characterState';
import locationReducer from './locationState';

export default combineReducers({
  character: characterReducer,
  location: locationReducer,
});
