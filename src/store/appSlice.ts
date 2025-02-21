import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '@ourtypes/AppState';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn', 'user'],
};

const initialState: AppState = {
  isLoggedIn: false,
  network: { isConnected: true },
  user:  null
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    login: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    
    setNetworkStatus: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      state.network.isConnected = action.payload.isConnected;
    },
  }
});

const persistedReducer = persistReducer(persistConfig, slice.reducer);
export { persistedReducer as appReducer };
export const { login, logout, setNetworkStatus } = slice.actions;
export type { AppState };