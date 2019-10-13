import React from "react"
import classnames from "classnames"
import "./styles.scss"

interface PlayerProps {
  isCutting: boolean
  onAnimationEnd: () => void
}

const Player = (props: PlayerProps) => {
  const playerClassName = classnames(
    "player",
    { "cutting": props.isCutting }
  )

  return (
    <div className={playerClassName} onAnimationEnd={props.onAnimationEnd}>
    </div>
  )
}

export default Player