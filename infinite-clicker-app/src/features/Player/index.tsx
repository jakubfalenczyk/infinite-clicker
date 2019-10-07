import React from "react"
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
  const playerClassName = classnames(
    "player",
    { "cutting": props.isCutting }
  )

  const getChoppingSound = () => {
    const randomSoundIndex = getRandom(2)
    return choppingSounds[randomSoundIndex]
  } 

  return (
    <div className={playerClassName} onAnimationEnd={props.onAnimationEnd}>
      <AudioContainer isPlaying={props.isCutting} src={getChoppingSound()}/>
    </div>
  )
}

export default Player