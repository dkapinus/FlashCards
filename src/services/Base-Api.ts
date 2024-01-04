import { CreateDecksArg, GetDecksArgs, GetDecksResponse } from '@/services/FlashCards.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDecks: builder.mutation<void, CreateDecksArg>({
        query: arg => {
          return {
            body: arg,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        query: args => {
          return {
            params: args ?? {},
            url: `v1/decks`,
          }
        },
      }),
    }
  },

  reducerPath: 'baseApi',
  refetchOnFocus: true,
})

export const { useCreateDecksMutation, useGetDecksQuery } = baseApi
