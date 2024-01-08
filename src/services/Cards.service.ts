import { baseApi } from '@/services/Base-Api'
import { CardsTypeResponse, CreateCardArg } from '@/services/Cards.types'

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
      getCards: builder.query<CardsTypeResponse, any>({
        providesTags: ['Cards'],
        query: ({ id, ...args }) => {
          return {
            params: args ?? {},
            url: `v1/decks/${id}/cards`,
          }
        },
      }),
    }
  },
})

export const { useCreateCardsMutation, useGetCardsQuery } = cardsService
