export interface GetDecksResponseItemsAuthor {
  items: Item[]
  maxCardsCount: number
  pagination: Pagination
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
