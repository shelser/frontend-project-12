import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    username: null,
    loggedIn: false,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.loggedIn = true;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;