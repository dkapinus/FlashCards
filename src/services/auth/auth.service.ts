import { LoginArgs, User } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base_Api/Base-Api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginArgs>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => '/v1/auth/me',
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authService
