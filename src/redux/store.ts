import { Action, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistAuthConfig = {
  key: 'auth',
  storage,
};

const persistCartConfig = {
  key: 'cart',
  storage
}

// Persisting auth reducer, cart reducer values on refresh
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer)

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);
export {store, persistor};

// export default store
export type AsyncAction = (dispatch: (action: Action) => any) => void;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;