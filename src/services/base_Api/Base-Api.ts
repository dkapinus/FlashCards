import { baseQueryWithReauth } from '@/services/base_Api/base-query-with-reauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  // refetchOnFocus: true,
  tagTypes: ['Decks', 'Cards', 'Learn', 'Me'],
})
