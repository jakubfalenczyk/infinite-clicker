import React, { PropsWithChildren } from "react"
import "./styles.scss"

interface ButtonProps {
  disabledTooltip?: string
  onClick: () => void
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { disabledTooltip, onClick, children } = props

  return (
    <button title={disabledTooltip} className="gameModalButton" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button