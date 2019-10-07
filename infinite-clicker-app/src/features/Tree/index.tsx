import React, { useState } from "react"
import classnames from "classnames"
import "./styles.scss"
import AudioContainer from "../AudioContainer"

interface TreeProps {
  type: string
  onClick: () => void
  isFalling: boolean
}

const Tree = (props: TreeProps) => {
  const [ isBouncing, setIsBouncing ] = useState(false)
  const treeClassName = classnames("tree", props.type, { "bounce": isBouncing })
  
  const onTreeClick = () => {
    setIsBouncing(true)
    props.onClick()
  }

  return (
    <div 
      className={treeClassName}
      onClick={() => onTreeClick()}
      onAnimationEnd={() => setIsBouncing(false)}
    >
      <AudioContainer isPlaying={props.isFalling} src="/assets/sounds/tree-fall.mp3"/>
    </div>
  )
}

export default Tree