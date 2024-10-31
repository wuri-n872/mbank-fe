import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'app/constants';
import { updateBalance } from 'store/features/userSlice';

import { User, } from './types';
import { RootState } from 'store/store';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/account`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.user?.token
  
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('Accept', 'application/json')
  
      return headers
    },
  }),
  endpoints: builder => ({
    getAccount: builder.query<User, void>({
      query: () => '/',
    }),
    withdraw: builder.mutation<User, number>({
      query: amount => ({
        url: '/withdraw',
        method: 'POST',
        body: { amount },
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateBalance(data.balance));
        } catch (err) { }
      },
    }),
    deposit: builder.mutation<User, number>({
      query: amount => ({
        url: '/deposit',
        method: 'POST',
        body: { amount },
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateBalance(data.balance));
        } catch (err) { }
      },
    }),
  }),
});

export const {
  useGetAccountQuery, useWithdrawMutation, useDepositMutation,
} = accountApi;
