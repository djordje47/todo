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
  }
});

export const {setAuthenticatedUser} = userSlice.actions;

export default userSlice.reducer;