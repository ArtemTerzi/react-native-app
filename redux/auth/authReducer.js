import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  login: null,
  avatar: null,
  email: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (
      state,
      { payload: { userId, login, avatar, email } }
    ) => ({
      ...state,
      userId,
      login,
      avatar,
      email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});
