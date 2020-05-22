import React from "react"
import "./styles.scss"
import useSound from "common/useSound"
import { uiSounds } from "sounds"

const Termite = () => {
  const squishSound = useSound(uiSounds.squish)

  const onClick = () => {
    squishSound.play()
  }

  return (
    <img 
      className="termite"
      src="/assets/images/termite.png"
      alt="termite"
      onClick={() => onClick()}
    />
  )
}

export default Termite