import { useController, useForm } from 'react-hook-form'

import { CheckBox } from '@/components/ui/checkbox'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { control, handleSubmit, register } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: true,
    name: 'rememberMe',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} label={'email'} />
      <Input {...register('password')} eye label={'password'} />
      <CheckBox checked={value} label={'remember me'} onCheckedChange={onChange} />
      <Button type={'submit'} variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
