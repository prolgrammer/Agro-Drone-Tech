import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@entities/slices/auth-slice";
import userReducer from "@entities/slices/user-slice";
import tokenReducer from "@widgets/layouts/private-layout";
import queryReducer from "@entities/slices/query-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    token: tokenReducer,
    query: queryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch