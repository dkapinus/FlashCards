import { baseApi } from '@/services/base_Api/Base-Api'
import {
  CardsTypeResponse,
  CreateCardArg,
  DeleteCardsArg,
  UpdateCardsArgs,
} from '@/services/cards_Api/Cards.types'

const cardsService = baseApi.injectEndpoints({
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
      getCards: builder.query<CardsTypeResponse, any>({
        providesTags: ['Cards'],
        query: ({ id, ...args }) => {
          return {
            params: args ?? {},
            url: `v1/decks/${id}/cards`,
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

export const {
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useGetCardsQuery,
  useUpdateCardsMutation,
} = cardsService
