import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'


export const store = configureStore({
  reducer: {
    authReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;