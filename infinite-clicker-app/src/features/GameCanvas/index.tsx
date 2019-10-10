import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import treeTypes from "./treeTypes"
import HealthBar from "../HealthBar"
import { getRandom, getRandomItem } from "../../common/random"
import { useGameState } from "../../gameState"
import PlayerStats from "../PlayerStats"
import useAudio from "../../common/useAudio"
import { choppingSounds } from "../../sounds"

const GameCanvas = ()  => {
  const { player, tree } = useGameState()
  const [ treeState, setTreeState ] = useState({ 
    type: treeTypes[0],
    isFalling: false
  })
  const [ playerState, setPlayerState ] = useState({
    isCutting: false
  })
  const choppingAudio = useAudio(getRandomItem(choppingSounds))

  const getNextTreeType = (): string => {
    const max = treeTypes.length - 1
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
    tree.updateCurrentLife(validatedLife)

    if (isTreeDead) {
      player.addWood(tree.wood)
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
    choppingAudio.changeTrack(getRandomItem(choppingSounds))
    choppingAudio.play()
  }

  return (
    <div className="game-canvas">
      <PlayerStats/>
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