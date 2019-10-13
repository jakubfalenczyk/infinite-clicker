import React, { PropsWithChildren } from "react"
import "./styles.scss"

interface ButtonProps {
  onClick: () => void
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { onClick, children } = props

  return (
    <button className="gameModalButton" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button