import React from "react"
import useSound from "common/useSound"
import { uiSounds } from "sounds"

export interface UIButtonProps {
  label: string
  onClick: () => void
  icon: JSX.Element
}

const UIButton = (props: UIButtonProps) => {
  const { onClick, label, icon } = props
  const menuClickSound = useSound(uiSounds.menuClick)

  const onClickHandler = () => {
    menuClickSound.play()
    onClick()
  }

  return (
    <div className="uiButton" onClick={onClickHandler}>
      {label}
      <div className="buttonIcon">
        {icon}
      </div>
    </div>
  )
}

export default UIButton