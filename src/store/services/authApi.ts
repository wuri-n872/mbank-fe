import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'app/constants';
import { setUser, updateTokens } from 'store/features/userSlice';

import { Credentials, User, UserTokens } from './types';

type UserWithTokens = User & UserTokens;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth/`,
    headers: {
      'Accept': 'application/json',
    },
  }),
  endpoints: builder => ({
    logIn: builder.mutation<UserWithTokens, Credentials>({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: { ...credentials, device_name: 'ReactJs App'},
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {}
      },
    }),
    refresh: builder.mutation<UserTokens, string>({
      query: refreshToken => ({
        url: 'refresh',
        body: { refreshToken },
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTokens(data));
        } catch (error) {}
      },
    }),
    getMe: builder.query<User, void>({
      query: () => 'me',
    }),
  }),
});

export const { useLogInMutation, useRefreshMutation, useGetMeQuery } = authApi;
