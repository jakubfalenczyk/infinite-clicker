import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import treeTypes from "./treeTypes"
import HealthBar from "../HealthBar"
import { getRandom } from "../../common/random"
import { useGameState } from "../../gameState/reducer"

const GameCanvas = ()  => {
  const { gameState, dispatch } = useGameState()
  const { player, tree } = gameState
  const [ treeState, setTreeState ] = useState({ 
    type: treeTypes[0],
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

  const cutDownTree = () => {
    setTreeState({
      type: getNextTreeType(),
      isFalling: true
    })
  }

  const damageTree = () => {
    const newTreeLife = tree.currentLife - player.axeDamage
    const isTreeDead = newTreeLife === 0
    const validatedLife = isTreeDead ? tree.maxLife : newTreeLife
    dispatch({ type: "Tree_UpdateCurrentLife", payload: validatedLife })
    
    if (isTreeDead) {
      dispatch({ type: "Player_UpdateWood", payload: tree.wood })
      cutDownTree()
    } else {
      setTreeState({
        ...treeState,
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
      <HealthBar life={tree.currentLife}/>
      <Player 
        isCutting={playerState.isCutting}
        onAnimationEnd={() => setPlayerState({ isCutting: false })}
      />
    </div>
  )
} 

export default GameCanvas