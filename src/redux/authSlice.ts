import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuth {
  token: string;
}

const initialState: IAuth = {
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    authLogout: state => {
      state.token = '';
    },
  },
});

export const { authSuccess, authLogout } = authSlice.actions;

export default authSlice.reducer;
