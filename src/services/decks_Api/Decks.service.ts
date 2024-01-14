import { baseApi } from '@/services/base_Api/Base-Api'
import {
  CreateDecksArg,
  DeleteDecksArg,
  GetDecksArgs,
  GetDecksResponse,
  UpdateDeckArg,
} from '@/services/decks_Api/Decks.types'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDecks: builder.mutation<void, CreateDecksArg>({
        invalidatesTags: ['Decks'],
        query: arg => {
          return {
            body: arg,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      deleteDecks: builder.mutation<void, DeleteDecksArg>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => {
          return {
            params: args ?? {},
            url: `v1/decks`,
          }
        },
      }),
      updateDecks: builder.mutation<void, UpdateDeckArg & DeleteDecksArg>({
        invalidatesTags: ['Decks'],
        // async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
        //   const state = getState() as RootState
        //
        //   console.log(state)
        //   const minCardsCount = state.decks.minCardsCount
        //   const patchResult = dispatch(
        //     decksService.util.updateQueryData('getDecks', minCardsCount, draft => {
        //       Object.assign(draft, patch)
        //     })
        //   )
        //
        //   try {
        //     await queryFulfilled
        //   } catch {
        //     patchResult.undo()
        //   }
        // },
        query: ({ id, ...arg }) => {
          return {
            body: arg,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} = decksService
