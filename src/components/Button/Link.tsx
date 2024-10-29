import React from 'react'
import { Link as BaseLink, LinkProps } from 'react-router-dom'

import './Button.scss'

export default function Link(props: LinkProps) {
  return (
    <BaseLink className='button button-link' {...props} />
  )
}
