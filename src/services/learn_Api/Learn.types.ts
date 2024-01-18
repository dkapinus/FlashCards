export type UpdateGrade = {
  cardId: string
  grade: number
  id: string
}

export interface Card {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: Date
}

export interface GetRandomCardArgs {
  id: string
  previousCardId?: string
}
