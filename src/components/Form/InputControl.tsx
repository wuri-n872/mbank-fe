import React, { PropsWithChildren } from "react"
import { FieldError } from "react-hook-form"

import './InputControl.scss'

export type InputControlProps = PropsWithChildren & {
  label?: string;
  error?: FieldError;
}

function InputControl({ label, error, children }: InputControlProps) {
  return (
    <div className="input-control">
      {label && <div className="input-control-label">{label}</div>}
      <div className="input-control-field">{children}</div>
      {error && (
        <div className="input-control-hint">
          <small className="error-message">{error.message}</small>
        </div>
      )}
    </div>
  )
}

export default InputControl
