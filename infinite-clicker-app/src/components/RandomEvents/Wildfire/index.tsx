import React from "react"
import "./styles.scss"
import useSound from "common/useSound"

const Wildfire = () => {
  const extinguishSound = useSound("sounds-extinguish")

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