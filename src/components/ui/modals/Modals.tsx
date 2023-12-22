import { ComponentProps, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from '@/components/ui/modals/Modals.module.scss'

export type ModalsProps = {
  buttonTitle: string
  defaultOpen?: boolean
  modalTitle?: string
  showCloseButton?: boolean
} & ComponentProps<'div'>
export const Modals = (props: ModalsProps) => {
  const { buttonTitle, children, defaultOpen, modalTitle, showCloseButton } = props

  const [open, setOpen] = useState(defaultOpen ? true : false)

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <Button variant={'primary'}>{buttonTitle}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
          {modalTitle && (
            <Dialog.Title className={s.dialogTitle}>
              <Typography variant={'h2'}>{modalTitle}</Typography>
              {showCloseButton && (
                <Dialog.Close asChild>
                  <button aria-label={'Close'} className={s.closeButton}>
                    <Cross2Icon className={s.closeIcon} />
                  </button>
                </Dialog.Close>
              )}
            </Dialog.Title>
          )}
          <Dialog.Description className={s.dialogDescription}>{children}</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
