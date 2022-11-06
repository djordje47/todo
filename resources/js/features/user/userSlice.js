import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, {payload}) => {
      state.currentUser = payload;
    },
    unsetAuthenticatedUser: (state) => {
      state.currentUser = null;
      localStorage.clear();
    }
  }
});

export const {setAuthenticatedUser, unsetAuthenticatedUser} = userSlice.actions;

export default userSlice.reducer;