import React from "react"
import "./styles.scss"
import useSound from "common/useSound"
import { uiSounds } from "sounds"

const Wildfire = () => {
  const extinguishSound = useSound(uiSounds.extinguish)

  const onClick = () => {
    extinguishSound.play()
  }

  return (
    <img 
      className="wildfire"
      src="/assets/images/flame.png"
      alt="wildfire"
      onClick={() => onClick()}
    />
  )
}

export default Wildfire