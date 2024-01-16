import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Controlled_Input } from '@/components/controlled/controlled_input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'classnames'
import { z } from 'zod'

import s from './Sign_Up.module.scss'

type Props = {
  className?: string
  onSubmit: (data: FormValues) => void
}

const signUpSchema = z
  .object({
    confirmPassword: z.string().trim(),
    email: z.string().email('Enter valid email').trim(),
    password: z.string().min(3, 'Min 3').trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password mismatch',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signUpSchema>

export const SignUp = ({ className, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })
  const navigate = useNavigate()

  return (
    <>
      <DevTool control={control} />
      <Layout isLoginIn>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={cn(s.container, className)}>
            <Typography as={'h2'} variant={'large'}>
              Sign Up
            </Typography>
            <Controlled_Input
              className={s.input}
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
              type={'email'}
            />
            <Controlled_Input
              className={s.input}
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
            <Controlled_Input
              className={s.input}
              control={control}
              errorMessage={errors.confirmPassword?.message}
              label={'Confirm Password'}
              name={'confirmPassword'}
              type={'password'}
            />
            <Button className={s.signInBtn} fullWidth type={'submit'} variant={'primary'}>
              <Typography variant={'subtitle2'}>Sign Up</Typography>
            </Button>
            <Typography as={'a'} className={s.linkAccount} variant={'body2'}>
              Already have an account?
            </Typography>
            <Button as={'a'} onClick={() => navigate('/login')} variant={'link'}>
              Sign In
            </Button>
          </Card>
        </form>
      </Layout>
    </>
  )
}
