import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "./components/Tree"
import treeTypes from "./treeTypes"
import HealthBar from "./components/HealthBar"

const GameCanvas = ()  => {
  const [ treeState, setTreeState ] = useState({ 
    life: 100,
    type: "tree-basic"
  })
  const [ playerState, setPlayerState ] = useState({
    isCutting: false
  })

  const getNextTreeType = () => {
    const currentTypeIndex = treeTypes.findIndex(t => t === treeState.type)
    const isNextIndexOutOfBounds = currentTypeIndex + 1 > treeTypes.length - 1
    const nextIndex = isNextIndexOutOfBounds ? 0 : currentTypeIndex + 1
    
    return treeTypes[nextIndex]
  }

  const damageTree = () => {
    const fullLife = 100
    const newTreeLife = treeState.life - 10
    const isTreeDead = newTreeLife === 0
    
    if (isTreeDead) {
      setTreeState({
        life: fullLife,
        type: getNextTreeType()
      })
    } else {
      setTreeState({
        life: newTreeLife,
        type: treeState.type,
      })
    }
  }

  const onTreeClick = () => {
    damageTree()
    setPlayerState({ isCutting: true })
  }

  return (
    <div className="game-canvas">
      <Tree type={treeState.type} onClick={() => onTreeClick()}/>
      <HealthBar life={treeState.life}/>
      <Player 
        isCutting={playerState.isCutting}
        onAnimationEnd={() => setPlayerState({ isCutting: false })}
      />
    </div>
  )
} 

export default GameCanvas