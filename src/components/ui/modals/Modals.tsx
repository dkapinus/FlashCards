import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from '@/components/ui/modals/Modals.module.scss'

export type ModalsProps = {
  buttonIcon?: ReactNode
  buttonTitle?: string
  buttonsInFooter?: any[]
  className?: string
  defaultOpen?: boolean
  disabled?: boolean
  modalTitle?: string
  openState?: boolean
  showCloseButton?: boolean
  variant?: 'link' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<typeof Dialog.Root>
export const Modals = forwardRef<ElementRef<typeof Dialog.Root>, ModalsProps>((props, ref) => {
  const {
    buttonIcon,
    buttonTitle,
    buttonsInFooter,
    children,
    className,
    defaultOpen,
    disabled,
    modalTitle,
    showCloseButton,
    variant = 'primary',
  } = props

  return (
    <Dialog.Root defaultOpen={defaultOpen}>
      <Dialog.Trigger asChild>
        <Button className={className} disabled={disabled} variant={variant}>
          {buttonTitle || buttonIcon}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent} ref={ref}>
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
          <Dialog.Description className={s.dialogDescription}>
            {children}
            <Dialog.Close className={s.buttonsInFooter}>
              {buttonsInFooter?.map((button, index) => <div key={index}>{button}</div>)}
            </Dialog.Close>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
