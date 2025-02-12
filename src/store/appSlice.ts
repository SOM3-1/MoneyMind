import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '@ourtypes/AppState';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn', ],
};

const initialState: AppState = {
  isLoggedIn: true,
  network: { isConnected: true }
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
        state.isLoggedIn = true;
    },

    logoutUser: (state) => {
      state.isLoggedIn = false;
    },
    
    
    setNetworkStatus: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      state.network.isConnected = action.payload.isConnected;
    },
  }
});

const persistedReducer = persistReducer(persistConfig, slice.reducer);
export { persistedReducer as appReducer };
export const { loginUser, logoutUser, setNetworkStatus } = slice.actions;
export type { AppState };