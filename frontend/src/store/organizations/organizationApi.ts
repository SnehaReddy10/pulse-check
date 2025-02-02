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
  tagTypes: ['organizationId', 'token'],
  endpoints(builder) {
    return {
      createOrganization: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '',
          body: payload,
        }),
        invalidatesTags: [
          { type: 'token', id: localStorage.getItem('token') ?? '' },
        ],
      }),
      getAllOrganizations: builder.query({
        query: () => ({
          method: 'GET',
          url: '',
        }),
        providesTags: ({ data }) => {
          const orgTags = data.map((x: any) => ({
            type: 'organizationId',
            id: x._id,
          }));
          return [
            ...orgTags,
            { type: 'token', id: localStorage.getItem('token') ?? '' },
          ];
        },
      }),
    };
  },
});

export const { useCreateOrganizationMutation, useGetAllOrganizationsQuery } =
  organizationApi;
