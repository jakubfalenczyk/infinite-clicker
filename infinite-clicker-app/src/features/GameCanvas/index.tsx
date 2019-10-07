import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import treeTypes from "./treeTypes"
import HealthBar from "../HealthBar"
import { getRandom } from "../../common/random"

const GameCanvas = ()  => {
  const [ treeState, setTreeState ] = useState({ 
    life: 100,
    type: "tree-basic",
    isFalling: false
  })
  const [ playerState, setPlayerState ] = useState({
    isCutting: false
  })

  const getNextTreeType = (): string => {
    const max = treeTypes.length
    const randomTreeTypeIndex = getRandom(max)
    const uniqueType = treeTypes[randomTreeTypeIndex] !== treeState.type
      ? treeTypes[randomTreeTypeIndex]
      : getNextTreeType()

    return uniqueType
  }

  const damageTree = () => {
    const fullLife = 100
    const newTreeLife = treeState.life - 10
    const isTreeDead = newTreeLife === 0
    
    if (isTreeDead) {
      setTreeState({
        life: fullLife,
        type: getNextTreeType(),
        isFalling: true
      })
    } else {
      setTreeState({
        life: newTreeLife,
        type: treeState.type,
        isFalling: false,
      })
    }
  }

  const onTreeClick = () => {
    damageTree()
    setPlayerState({ isCutting: true })
  }

  return (
    <div className="game-canvas">
      <Tree 
        type={treeState.type}
        isFalling={treeState.isFalling}
        onClick={() => onTreeClick()}
      />
      <HealthBar life={treeState.life}/>
      <Player 
        isCutting={playerState.isCutting}
        onAnimationEnd={() => setPlayerState({ isCutting: false })}
      />
    </div>
  )
} 

export default GameCanvas