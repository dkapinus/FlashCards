import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/ui/layout/Layout'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Tables } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import {
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useGetDecksQuery,
} from '@/services/Decks.service'

import s from './Decks.module.scss'

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState('10')
  const [name, setInputValue] = useState('')

  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage)
    }
  }

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }

  const { data, error, isLoading } = useGetDecksQuery({ currentPage, name })
  const [createDeck, deckCreationStatus] = useCreateDecksMutation()
  const [deletePack, deckDeleteStatus] = useDeleteDecksMutation()

  const DeletePack = () => {
    deletePack({ id: 'clkyc7rlm0020yb2qwnggodrn' })
  }

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
      <div className={s.container}>
        <div className={s.caption}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button
            disabled={deckCreationStatus.isLoading}
            onClick={() => createDeck({ name: 'abraham' })}
            variant={'primary'}
          >
            <Typography variant={'subtitle2'}>Add New Pack</Typography>
          </Button>
        </div>
        <div className={s.sectionSearch}>
          <Input
            className={s.input}
            onPressEnter={() => {}}
            onValueChange={setInputSearch}
            type={'search'}
            value={name}
          />
          <TabSwitcher name={'My Cards'} />
          <TabSwitcher name={'All Cards'} />
          <Slider propsValue={[0, 10]} valueChange={() => ''} />
          <Button variant={'secondary'}>
            <>
              <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
              Clear Filter
            </>
          </Button>
        </div>
        <Tables.Root>
          <Tables.Head>
            <Tables.Row>
              <Tables.Cell>Name</Tables.Cell>
              <Tables.Cell>Cards</Tables.Cell>
              <Tables.Cell>Updated</Tables.Cell>
              <Tables.Cell>Author</Tables.Cell>
              <Tables.Cell></Tables.Cell>
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
                  <Tables.Cell>
                    <Button
                      className={s.button}
                      disabled={deckDeleteStatus.isLoading}
                      onClick={DeletePack}
                      variant={'secondary'}
                    >
                      <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
                    </Button>
                    <Button
                      className={s.button}
                      disabled={deckDeleteStatus.isLoading}
                      onClick={DeletePack}
                      variant={'secondary'}
                    >
                      <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                    </Button>
                  </Tables.Cell>
                </Tables.Row>
              )
            })}
          </Tables.Body>
        </Tables.Root>
        <Pagination
          className={s.pagination}
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
      </div>
    </Layout>
  )
}

export default Decks
