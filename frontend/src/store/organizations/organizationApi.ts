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
  tagTypes: ['Organization', 'Token'],
  endpoints(builder) {
    return {
      createOrganization: builder.mutation({
        query: (payload) => ({
          method: 'POST',
          url: '',
          body: payload,
        }),
        invalidatesTags: [
          { type: 'Token', id: localStorage.getItem('token') ?? '' },
        ],
      }),

      getAllOrganizations: builder.query({
        query: () => ({
          method: 'GET',
          url: '',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result?.data?.map((org: any) => ({
                  type: 'Organization',
                  id: org._id,
                })),
                { type: 'Token', id: localStorage.getItem('token') ?? '' },
              ]
            : [{ type: 'Token', id: localStorage.getItem('token') ?? '' }],
      }),

      updateOrganization: builder.mutation({
        query: ({ id, ...payload }) => ({
          method: 'PUT',
          url: `/${id}`,
          body: payload,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: 'Organization', id },
        ],
      }),

      deleteOrganization: builder.mutation({
        query: (id) => ({
          method: 'DELETE',
          url: `/${id}`,
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Organization', id }],
      }),

      getOrganizationById: builder.query({
        query: (id) => ({
          method: 'GET',
          url: `/${id}`,
        }),
        providesTags: (result, error, id) => [{ type: 'Organization', id }],
      }),
    };
  },
});

export const {
  useCreateOrganizationMutation,
  useGetAllOrganizationsQuery,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetOrganizationByIdQuery,
  useLazyGetOrganizationByIdQuery,
} = organizationApi;
