import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from './auth/authReducer';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
