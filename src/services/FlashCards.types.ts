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

export type CreateDecksArg = {
  cover?: string
  isPrivate?: boolean
  name: string
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
