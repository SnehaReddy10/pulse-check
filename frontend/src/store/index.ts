import { configureStore } from '@reduxjs/toolkit';
import { authApi, useLoginMutation, useRegisterMutation } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  organizationApi,
  useCreateOrganizationMutation,
  useGetAllOrganizationsQuery,
} from './organizations/organizationApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(organizationApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useRegisterMutation,
  useLoginMutation,
  useCreateOrganizationMutation,
  useGetAllOrganizationsQuery,
};
