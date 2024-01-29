import { RootState } from '@/services/Store'
import { baseApi } from '@/services/base_Api/Base-Api'
import {
  Deck,
  DeleteDecksArg,
  GetDeckById,
  GetDecksArgs,
  GetDecksResponse,
  UpdateDeckParamsType,
} from '@/services/decks_Api/Decks.types'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDecks: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const minCardsCount = state.decks.minCards
          const nameSearch = state.decks.search
          const currentPage = state.decks.currentPage
          const maxCardsCount = state.decks.maxCards
          const authorId = state.decks.authorId

          const response = await queryFulfilled

          dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              { authorId, currentPage, maxCardsCount, minCardsCount, name: nameSearch },
              draft => {
                draft.items.unshift(response.data)
              }
            )
          )
        },
        query: body => {
          return {
            body,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      deleteDecks: builder.mutation<void, DeleteDecksArg>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const minCardsCount = state.decks.minCards
          const nameSearch = state.decks.search
          const currentPage = state.decks.currentPage
          const maxCardsCount = state.decks.maxCards
          const authorId = state.decks.authorId

          const patchResult = dispatch(
            decksService.util.updateQueryData(
              'getDecks',
              { authorId, currentPage, maxCardsCount, minCardsCount, name: nameSearch },
              draft => {
                const index = draft?.items?.findIndex(deck => deck.id === id)

                if (index !== -1) {
                  draft?.items?.splice(index, 1)
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },

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
      updateDecks: builder.mutation<void, UpdateDeckParamsType>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ body, id }, { dispatch, getState, queryFulfilled }) {
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
                const index = draft.items.findIndex(deck => deck.id === id)
                let cover = ''

                const name = body.get('name')
                const isPrivate = body.get('isPrivate')
                const coverBlob = body.get('cover')

                if (coverBlob instanceof Blob) {
                  cover = URL.createObjectURL(coverBlob)
                }

                if (index !== -1) {
                  draft.items[index] = {
                    ...draft.items[index],
                    cover: cover,
                    isPrivate: !!isPrivate,
                    name: typeof name === 'string' ? name : '',
                  }
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: ({ body, id }) => {
          return {
            body,
            formData: true,
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
