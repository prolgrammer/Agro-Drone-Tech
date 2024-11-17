import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@entities/slices/auth-slice";
import userReducer from "@entities/slices/user-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch