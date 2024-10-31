import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'app/constants';
import { setUser } from 'store/features/userSlice';

import { Credentials, User, UserTokens } from './types';

type UserWithTokens = User & UserTokens;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    headers: {
      'Accept': 'application/json',
    },
  }),
  endpoints: builder => ({
    logIn: builder.mutation<UserWithTokens, Credentials>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {}
      },
    }),
  }),
});

export const { useLogInMutation } = authApi;
