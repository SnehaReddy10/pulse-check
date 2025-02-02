import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationApi = createApi({
  reducerPath: 'organization',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/organizations',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      createOrganization: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '',
          body: payload,
        }),
      }),
      getAllOrganizations: builder.query({
        query: () => ({
          method: 'GET',
          url: '',
        }),
      }),
    };
  },
});

export const { useCreateOrganizationMutation, useGetAllOrganizationsQuery } =
  organizationApi;
