import { baseApi } from '@/services/base_Api/Base-Api'
import { Card, GetRandomCardArgs, UpdateGrade } from '@/services/learn_Api/Learn.types'

const learnService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getLearnCards: builder.query<Card, GetRandomCardArgs>({
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          try {
            const { data: nextCard } = await queryFulfilled

            dispatch(learnService.util.updateQueryData('getLearnCards', { id: id }, () => nextCard))
          } catch (error) {
            console.log(error)
          }
        },
        providesTags: ['Learn'],
        query: ({ id, previousCardId }) => ({
          params: { previousCardId },
          url: `v1/decks/${id}/learn`,
        }),
      }),
      postGradeCard: builder.mutation<Card, UpdateGrade>({
        invalidatesTags: ['Learn'],
        query: ({ id, ...args }) => {
          return {
            body: args,
            method: 'POST',
            url: `v1/decks/${id}/learn`,
          }
        },
      }),
    }
  },
})

export const { useGetLearnCardsQuery, usePostGradeCardMutation } = learnService
