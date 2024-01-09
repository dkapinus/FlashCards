import { baseApi } from '@/services/base_Api/Base-Api'
import { CreateCardArg, DeleteCardsArg, UpdateCardsArgs } from '@/services/cards_Api/Cards.types'
import { LearnResponse } from '@/services/learn_Api/Learn.types'

const learnService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCards: builder.mutation<void, CreateCardArg>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...args }) => {
          return {
            body: args,
            method: 'POST',
            url: `v1/decks/${id}/cards`,
          }
        },
      }),
      deleteCards: builder.mutation<void, DeleteCardsArg>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `v1/cards/${id}`,
          }
        },
      }),
      getLearnCards: builder.query<LearnResponse, any>({
        providesTags: ['Learn'],
        query: ({ id, ...args }) => {
          return {
            params: args ?? {},
            url: `v1/decks/${id}/learn`,
          }
        },
      }),
      updateCards: builder.mutation<void, UpdateCardsArgs & DeleteCardsArg>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...arg }) => {
          return {
            body: arg,
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const { useGetLearnCardsQuery } = learnService
