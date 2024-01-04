import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout/Layout'
import { Pagination } from '@/components/ui/pagination'
import { Tables } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { useCreateDecksMutation, useGetDecksQuery } from '@/services/Base-Api'

import s from './Decks.module.scss'

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState('10')
  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage)
    }
  }
  const { data, error, isLoading } = useGetDecksQuery({ currentPage })
  const [createDeck, deckCreationStatus] = useCreateDecksMutation()

  console.log(deckCreationStatus)

  if (isLoading) {
    return <Typography variant={'h1'}>Loading</Typography>
  }

  if (error) {
    return (
      <>
        <Typography variant={'h1'}>Error</Typography>
        <Typography variant={'h1'}>{JSON.stringify(error)}</Typography>
      </>
    )
  }

  return (
    <Layout isLoginIn>
      <div className={s.caption}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button
          disabled={deckCreationStatus.isLoading}
          onClick={() => createDeck({ name: 'Vika' })}
          variant={'primary'}
        >
          <Typography variant={'subtitle2'}>Add New Pack</Typography>
        </Button>
      </div>
      <Tables.Root>
        <Tables.Head>
          <Tables.Row>
            <Tables.Cell>Name</Tables.Cell>
            <Tables.Cell>Cards</Tables.Cell>
            <Tables.Cell>Updated</Tables.Cell>
            <Tables.Cell>Author</Tables.Cell>
          </Tables.Row>
        </Tables.Head>
        <Tables.Body>
          {data?.items?.slice(0, +view).map(deck => {
            return (
              <Tables.Row key={deck?.id}>
                <Tables.Cell>{deck?.name}</Tables.Cell>
                <Tables.Cell>{deck?.cardsCount}</Tables.Cell>
                <Tables.Cell>{new Date(deck?.updated).toLocaleDateString()}</Tables.Cell>
                <Tables.Cell>{deck?.author.name}</Tables.Cell>
              </Tables.Row>
            )
          })}
        </Tables.Body>
      </Tables.Root>
      <Pagination
        currentPage={data?.pagination.currentPage ?? 1}
        onChangePage={setPage}
        onValueChange={setView}
        options={[
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '5', value: '5' },
          { title: '10', value: '10' },
        ]}
        pageSize={data?.pagination.itemsPerPage ?? 10}
        totalCount={data?.pagination.totalItems ?? 0}
      />
    </Layout>
  )
}

export default Decks
