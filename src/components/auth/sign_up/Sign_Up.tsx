import { useForm } from 'react-hook-form'

import { Controlled_Input } from '@/components/controlled/controlled_input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './Sign_Up.module.scss'

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
export const SignUp = () => {
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
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <DevTool control={control} />
      <Header isLoginIn={false} name={'user'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.container}>
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
          <Button as={'a'} onClick={() => 'navigate to Sign up form'} variant={'link'}>
            Sign In
          </Button>
        </Card>
      </form>
    </>
  )
}
