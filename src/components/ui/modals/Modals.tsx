import { ComponentProps, ReactNode, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from '@/components/ui/modals/Modals.module.scss'

export type ModalsProps = {
  buttonIcon?: ReactNode
  buttonTitle?: string
  className?: string
  defaultOpen?: boolean
  disabled?: boolean
  isModalOpen?: boolean
  modalTitle?: string
  openState?: boolean
  setOpenCallback?: () => void
  showCloseButton?: boolean
  variant?: 'link' | 'secondary' | 'tertiary'
} & ComponentProps<'div'>
export const Modals = (props: ModalsProps) => {
  const {
    buttonIcon,
    buttonTitle,
    children,
    className,
    defaultOpen,
    disabled,
    isModalOpen,
    modalTitle,
    setOpenCallback,
    showCloseButton,
    variant = 'primary',
  } = props
  const [open, setOpen] = useState(isModalOpen)

  useEffect(() => {
    setOpen(isModalOpen)
  }, [isModalOpen])

  return (
    <Dialog.Root defaultOpen={defaultOpen} onOpenChange={setOpenCallback} open={open}>
      <Dialog.Trigger asChild>
        <Button className={className} disabled={disabled} variant={variant}>
          {buttonTitle || buttonIcon}
        </Button>
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
