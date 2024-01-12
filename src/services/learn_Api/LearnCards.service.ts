import { baseApi } from '@/services/base_Api/Base-Api'
import { LearnResponse } from '@/services/learn_Api/Learn.types'

const learnService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getLearnCards: builder.query<LearnResponse, any>({
        providesTags: ['Learn'],
        query: ({ id, ...args }) => {
          return {
            params: args ?? {},
            url: `v1/decks/${id}/learn`,
          }
        },
      }),
    }
  },
})

export const { useGetLearnCardsQuery } = learnService
