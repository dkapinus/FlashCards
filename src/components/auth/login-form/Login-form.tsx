import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox/Controlled-Checkbox'
import { DevTool } from '@hookform/devtools'
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
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Input {...register('email')} errorMessage={errors.email?.message} label={'email'} />
      <Input
        {...register('password')}
        errorMessage={errors.password?.message}
        eye
        label={'password'}
      />
      <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type={'submit'} variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
