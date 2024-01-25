export interface GetDecksResponse {
  items: Item[]
  maxCardsCount: number
  pagination: Pagination
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type DeleteDecksArg = {
  id: string
}

// type UpdateDeckParamsTypeBody = {
//   cover: FormData
//   isPrivate: boolean
//   name: string
// }

export type UpdateDeckParamsType = {
  body: FormData
  id: string
}
export interface Item {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted?: boolean | null
  isPrivate: boolean
  name: string
  shots: number
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface GetDeckById {
  cardsCount: number
  cover?: any
  created: string
  id: string
  isBlocked?: any
  isDeleted?: any
  isPrivate: boolean
  name: string
  shots: number
  updated: string
  userId: string
}

export type Tab = 'All Pack' | 'My Pack'
