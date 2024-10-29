import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import './Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: String
}

function renderWithIcon(children: ReactNode, icon: String) {
  return (
    <div className='button-wrapper'>
      <div className='button-icon'>{icon}</div>
      {children}
    </div>
  )
}

export default function Button({ type, children, icon, ...restAttrs }: ButtonProps) {
  return (
    <button {...restAttrs} className='button'>
      {icon ? renderWithIcon(children, icon) : children}
    </button>
  )
}
