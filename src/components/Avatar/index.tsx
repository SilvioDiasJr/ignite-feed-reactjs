import React, { ImgHTMLAttributes } from 'react'

import styles from './styles.module.css'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  borderless?: boolean
}

export const Avatar: React.FC<Props> = ({ borderless, ...rest }) => {
  return (
    <img
      className={borderless ? styles.avatarBorderless : styles.avatar}
      {...rest}
    />
  )
}
