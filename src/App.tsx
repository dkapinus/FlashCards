import { Provider } from 'react-redux'

import { Router } from '@/Router'
import { store } from '@/services/Store'

export function App() {
  return (
    <Provider store={store}>
      {/*<Delete className={i.ButtonWithIcons} variant={'secondary'}>*/}
      {/*  <div>Hello1</div>*/}
      {/*</Delete>*/}
      {/*<Edit className={i.ButtonWithIcons} disabled variant={'secondary'}>*/}
      {/*  <div>Hello2</div>*/}
      {/*</Edit>*/}
      {/*<Learn className={i.ButtonWithIcons} disabled variant={'secondary'}>*/}
      {/*  <div>Hello3</div>*/}
      {/*</Learn>*/}
      {/*<TextControlIcons />*/}
      {/*<br />*/}
      {/*<ControlIcons disabledDelete disabledLearn />*/}
      <Router />
    </Provider>
  )
}
