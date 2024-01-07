import { ReactNode } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import { Modals } from '@/components/ui/modals'

type DeleteProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  variant: 'link' | 'secondary' | 'tertiary'
}
export const Edit = ({ children, className, disabled, variant = 'secondary' }: DeleteProps) => {
  return (
    <div>
      <Modals
        buttonIcon={<Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />}
        className={className}
        disabled={disabled}
        variant={variant}
      >
        {children}
      </Modals>
    </div>
  )
}
