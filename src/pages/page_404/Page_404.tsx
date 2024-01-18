import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth/auth.service'

import s from '@/pages/page_404/Page_404.module.scss'

import pageNotFoundImg from '../../assets/images/404.svg'

export const Page_404 = () => {
  const { data: userData, isError } = useMeQuery()
  const navigate = useNavigate()

  return (
    <Layout avatar={userData?.avatar || ''} isLoginIn={!isError} name={userData?.name || ''}>
      <div className={s.pageNotFoundContainer}>
        <img className={s.pageNotFoundImg} src={pageNotFoundImg} />
        <Typography className={s.message} variant={'body1'}>
          Sorry! Page not found!
        </Typography>
        <Button as={'a'} fullWidth={false} onClick={() => navigate('/')} variant={'primary'}>
          Back to home page
        </Button>
      </div>
    </Layout>
  )
}
