import { configureStore } from '@reduxjs/toolkit';
import { authApi, useLoginMutation, useRegisterMutation } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useRegisterMutation, useLoginMutation };
