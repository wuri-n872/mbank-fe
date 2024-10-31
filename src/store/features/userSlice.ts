import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserTokens } from '../services/types';

interface UserState {
  isLoggedIn: boolean;
  user: (User & UserTokens) | undefined;
}

type UserWithTokens = User & UserTokens;

const initialState: UserState = {
  isLoggedIn: false,
  user: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logOut: () => initialState,
    setUser: (state, action: PayloadAction<UserWithTokens>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.user = { ...state.user!, balance: action.payload }
    },
  },
});

export const { setUser, updateBalance, logOut } = userSlice.actions;
export default userSlice.reducer;
