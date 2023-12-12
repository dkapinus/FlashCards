import React from 'react'

import iconsSprite from '../../assets/images/icon.svg'

type IconPropsType = {
  height?: string
  iconId: string
  viewBox?: string
  width?: string
}

export const Icon: React.FC<IconPropsType> = ({ height, iconId, viewBox, width }) => {
  return (
    <svg
      fill={'none'}
      height={height || '50'}
      viewBox={viewBox || '0 0 120 120'}
      width={width || '50'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${iconsSprite}#${iconId}`} />
    </svg>
  )
}
