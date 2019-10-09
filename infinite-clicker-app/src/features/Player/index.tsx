import React, { useState, useEffect } from "react"
import classnames from "classnames"
import "./styles.scss"
import { getRandom } from "../../common/random"
import AudioContainer from "../AudioContainer"

interface PlayerProps {
  isCutting: boolean
  onAnimationEnd: () => void
}

const choppingSounds = [
  "/assets/sounds/axe-chop-1.mp3",
  "/assets/sounds/axe-chop-2.mp3",
  "/assets/sounds/axe-chop-3.mp3",
]

const Player = (props: PlayerProps) => {
  const [ choppingSound, setChoppingSound ] = useState(choppingSounds[0])

  const playerClassName = classnames(
    "player",
    { "cutting": props.isCutting }
  )

  const randomChoppingSound = () => {
    const randomSoundIndex = getRandom(2)
    return choppingSounds[randomSoundIndex]
  } 

  useEffect(() => {
    setChoppingSound(randomChoppingSound())
  }, [props.isCutting])

  return (
    <div className={playerClassName} onAnimationEnd={props.onAnimationEnd}>
      <AudioContainer isPlaying={props.isCutting} src={choppingSound}/>
    </div>
  )
}

export default Player