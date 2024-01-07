import { Provider } from 'react-redux'

import { Delete } from '@/components/ui/modal_icons/Delete'
import { Edit } from '@/components/ui/modal_icons/Edit'
import { Learn } from '@/components/ui/modal_icons/Learn'
import { ControlIcons } from '@/components/ui/table/control_icons/СontrolIcons'
import { TextControlIcons } from '@/components/ui/table/text_control_icons/TextСontrolIcons'
import { store } from '@/services/Store'

import i from '@/components/ui/modal_icons/Modul_Icons.module.scss'

export function App() {
  return (
    <Provider store={store}>
      <Delete className={i.ButtonWithIcons} variant={'secondary'}>
        <div>Hello1</div>
      </Delete>
      <Edit className={i.ButtonWithIcons} disabled variant={'secondary'}>
        <div>Hello2</div>
      </Edit>
      <Learn className={i.ButtonWithIcons} disabled variant={'secondary'}>
        <div>Hello3</div>
      </Learn>
      <TextControlIcons />
      <br />
      <ControlIcons disabledDelete disabledLearn />
      {/*<Router />*/}
    </Provider>
  )
}
