export interface CardsTypeResponse {
  items: Item[]
  pagination: Pagination
}

export interface Item {
  answer: string
  answerImg?: any
  answerVideo?: any
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: any
  questionVideo?: any
  shots: number
  updated: string
  userId: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type CreateCardArg = {
  answer?: string
  id?: string
  question?: string
}
