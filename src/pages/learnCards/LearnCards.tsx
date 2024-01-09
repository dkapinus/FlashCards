import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon/Icon'
import { Layout } from '@/components/ui/layout/Layout'
import { RadioGroup } from '@/components/ui/radioGroup'
import { Typography } from '@/components/ui/typography'
import { useGetLearnCardsQuery } from '@/services/learn_Api/LearnCards.service'

import s from './Learn.module.scss'

const LearnCards = () => {
  const [openAnswer, setOpenAnswer] = useState(false)

  const params = useParams()

  const userId = params.id

  const { data } = useGetLearnCardsQuery({ id: userId })

  const onClickAnswer = () => {
    setOpenAnswer(true)
  }

  const onClickNext = () => {
    setOpenAnswer(false)
  }

  return (
    <>
      <Layout isLoginIn>
        <Button as={'a'} href={'/'} variant={'link'}>
          <Icon height={'24'} iconId={'arrow-back'} viewBox={'0 0 24 24'} width={'24'} />
          Back to Packs List
        </Button>
        <Card className={s.container}>
          <Typography variant={'large'}>Learn “Pack Name”</Typography>
          <Typography variant={'subtitle1'}>Question: {data?.question}</Typography>
          {openAnswer ? (
            <div>
              <div>Answer:{data?.answer}</div>
              <img className={s.img} src={data?.questionImg} />
              <RadioGroup
                onChange={() => ''}
                options={[
                  { id: 0, title: 'Did not know', value: '1' },
                  { id: 0, title: 'Did not know', value: '2' },
                  { id: 0, title: 'Did not know', value: '3' },
                  { id: 0, title: 'Did not know', value: '4' },
                  { id: 0, title: 'Did not know', value: '5' },
                ]}
              />
              <Button fullWidth onClick={onClickNext} variant={'primary'}>
                Next Question
              </Button>
            </div>
          ) : (
            <Button fullWidth onClick={onClickAnswer} variant={'primary'}>
              <Typography variant={'subtitle2'}>Show Answer</Typography>
            </Button>
          )}
        </Card>
      </Layout>
    </>
  )
}

export default LearnCards
