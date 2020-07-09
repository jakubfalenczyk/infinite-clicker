import React from "react"
import useSound from "common/useSound"
import { uiSounds } from "sounds"
import classNames from "classnames"

export interface UIButtonProps {
  className?: string
  label: string
  onClick: () => void
  icon: JSX.Element
}

const UIButton = (props: UIButtonProps) => {
  const { className, onClick, label, icon } = props
  const container = classNames("uiButton", className)
  const menuClickSound = useSound(uiSounds.menuClick)

  const onClickHandler = () => {
    menuClickSound.play()
    onClick()
  }

  return (
    <div className={container} onClick={onClickHandler}>
      {label}
      <div className="buttonIcon">
        {icon}
      </div>
    </div>
  )
}

export default UIButton