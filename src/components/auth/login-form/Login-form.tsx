import { useController, useForm } from 'react-hook-form'

import { CheckBox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} errorMessage={errors.email?.message} label={'email'} />
      <Input
        {...register('password')}
        errorMessage={errors.password?.message}
        eye
        label={'password'}
      />
      <CheckBox checked={value} label={'remember me'} onCheckedChange={onChange} />
      <Button type={'submit'} variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
