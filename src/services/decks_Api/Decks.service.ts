import { RootState } from '@/services/Store'
import { baseApi } from '@/services/base_Api/Base-Api'
import {
  DeleteDecksArg,
  GetDeckById,
  GetDecksArgs,
  GetDecksResponse,
  UpdateDeckArg,
} from '@/services/decks_Api/Decks.types'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDecks: builder.mutation<void, FormData>({
        invalidatesTags: ['Decks'],
        query: arg => {
          return {
            body: arg,
            formData: true,
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
      getDecksById: builder.query<GetDeckById, any>({
        providesTags: ['Decks'],
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
          }
        },
      }),
      updateDecks: builder.mutation<void, UpdateDeckArg & DeleteDecksArg>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const minCardsCount = state.decks.minCards
          const nameSearch = state.decks.search
          const currentPage = state.decks.currentPage
          const maxCardsCount = state.decks.maxCards
          const authorId = state.decks.authorId

          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              {
                authorId,
                currentPage,
                maxCardsCount,
                minCardsCount,
                name: nameSearch,
              },
              draft => {
                const deck = draft.items.find(deck => deck.id === id)

                if (!deck) {
                  return
                }
                Object.assign(deck, patch)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
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
  useGetDecksByIdQuery,
  useGetDecksQuery,
  useUpdateDecksMutation,
} = decksService
