import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign_up/Sign_Up'
import { useSignUpMutation } from '@/services/auth/auth.service'
import { SignUpArgs } from '@/services/auth/auth.types'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const handleSignUp = async (data: SignUpArgs) => {
    const { email, password } = data

    try {
      await signUp({ email, password }).unwrap()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return <SignUp onSubmit={handleSignUp} />
}

// {
//   "id": "5e57ec97-9cb4-4c3a-8f83-7e87ec9d9725",
//   "name": "test88",
//   "email": "test88@mail.com"
// }
