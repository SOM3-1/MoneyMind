export interface NetworkState {
    isConnected: boolean;
  }

export interface AppState  {
    isLoggedIn: boolean;
    network: NetworkState;
}

