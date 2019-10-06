import React, { useState } from "react"
import classnames from "classnames"
import "./styles.scss"

interface TreeProps {
  type: string
  onClick: () => void
}

const Tree = (props: TreeProps) => {
  const [ isBouncing, setIsBouncing ] = useState(false)
  const treeClassName = classnames(
    "tree",
    props.type,
    { "bounce": isBouncing }
  )
  
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
    </div>
  )
}

export default Tree