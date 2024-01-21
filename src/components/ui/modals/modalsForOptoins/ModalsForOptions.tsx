import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from '@/components/ui/modals/Modals.module.scss'

export type ModalsProps = {
  buttonIcon?: ReactNode
  buttonTitle?: ReactNode
  buttonsInFooter?: any[]
  className?: string
  defaultOpen?: boolean
  disabled?: boolean
  modalTitle?: string
  openState?: boolean
  showCloseButton?: boolean
  variant?: 'link' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<typeof Dialog.Root>
export const ModalsForOptions = forwardRef<ElementRef<typeof Dialog.Root>, ModalsProps>(
  (props, ref) => {
    const {
      buttonTitle,
      buttonsInFooter,
      children,
      defaultOpen,
      disabled,
      modalTitle,
      showCloseButton,
    } = props

    console.log('modal')

    return (
      <Dialog.Root defaultOpen={defaultOpen}>
        <Dialog.Trigger asChild>
          <button className={s.trigger} disabled={disabled}>
            {buttonTitle}
          </button>
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
  }
)
