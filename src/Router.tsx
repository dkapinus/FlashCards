import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Cards from '@/pages/cards/Cards'
import Decks from '@/pages/decks/Decks'
import LearnCards from '@/pages/learnCards/LearnCards'
import { SignInPage } from '@/pages/sign_in_page'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <Cards />,
    path: '/cards/:id',
  },
  {
    element: <LearnCards />,
    path: '/learnCards/:id',
  },
]

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <div> Loading...</div>
  }
  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading } = useMeQuery()

  if (isLoading) {
    return <div> Loading...</div>
  }

  return <RouterProvider router={router} />
}
