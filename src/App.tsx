import { Provider } from 'react-redux'

import { Router } from '@/Router'
import { store } from '@/services/Store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
