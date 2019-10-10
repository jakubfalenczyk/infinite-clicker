import React, { useState, useEffect, useRef } from "react"
import classnames from "classnames"
import "./styles.scss"
import useAudio from "../../common/useAudio"

interface TreeProps {
  type: string
  onClick: () => void
  isFalling: boolean
}

const Tree = (props: TreeProps) => {
  const [ isBouncing, setIsBouncing ] = useState(false)
  const treeFallAudio = useRef(useAudio("/assets/sounds/tree-fall.mp3"))
  const treeClassName = classnames("tree", props.type, { "bounce": isBouncing })
  
  const onTreeClick = () => {
    setIsBouncing(true)
    props.onClick()
  }

  useEffect(() => {
    if (props.isFalling) {
      treeFallAudio.current.play()
    }
  }, [props.isFalling])

  return (
    <div 
      className={treeClassName}
      onClick={() => onTreeClick()}
      onAnimationEnd={() => setIsBouncing(false)}
    >
    </div>
  )
}

export default Tree