import React, { useState, useCallback } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import treeTypes from "./treeTypes"
import HealthBar from "../HealthBar"
import UserInterface from "components/UserInterface"
import { useGameState } from "gameState"
import useSound from "common/useSound"
import { getRandomItem } from "common/random"
import { choppingSounds, backgroundMusic, treeFallSound } from "sounds"
import useMusic from "common/useMusic"
import { throttle } from "lodash"
import { TreeClickedParams } from "./treeClickParams"

const GameCanvas = ()  => {
  const { player, tree } = useGameState()
  const [ treeState, setTreeState ] = useState({ type: treeTypes[0] })
  const [ playerState, setPlayerState ] = useState({ isCutting: false })
  const choppingAudio = useSound(getRandomItem(choppingSounds))
  const treeFallAudio = useSound(treeFallSound)
  useMusic(backgroundMusic[0])

  const getNextTreeType = (): string => {
    const randomTreeType = getRandomItem(treeTypes)
    const uniqueType = randomTreeType !== treeState.type
      ? randomTreeType
      : getNextTreeType()

    return uniqueType
  }

  const cutDownTree = () => {
    setTreeState({
      type: getNextTreeType(),
    })
    treeFallAudio.play()
  }

  const damageTree = () => {
    const newTreeLife = tree.currentLife - player.axeDamage
    const isTreeDead = newTreeLife === 0
    const updatedLife = isTreeDead ? tree.maxLife : newTreeLife
    
    return {
      updatedLife,
      isTreeDead,
    }
  }

  const onTreeClick = () => {
    const { updatedLife, isTreeDead } = damageTree()
    const updatedWood = player.wood + tree.wood
    const choppingSound = getRandomItem(choppingSounds)
    choppingAudio.changeTrack(choppingSound)

    treeClickedThrottled({
      updatedLife,
      isTreeDead,
      updatedWood,
      choppingAudio,
    })
  }

  const treeClicked = (request: TreeClickedParams) => {
    tree.updateCurrentLife(request.updatedLife)

    if (request.isTreeDead) {
      player.updateState({ wood: request.updatedWood })
      cutDownTree()
    }

    setPlayerState({ isCutting: true })
    request.choppingAudio.play()
  }

  const treeClickedThrottled = useCallback(throttle(
    (request: TreeClickedParams) => treeClicked(request),
    150,
    { trailing: false }
  ), [])

  return (
    <div className="game-canvas">
      <UserInterface/>
      <div className="clickingArea">
        <Tree 
          type={treeState.type}
          onClick={() => onTreeClick()}
        />
        <HealthBar life={tree.currentLife}/>
        <Player 
          isCutting={playerState.isCutting}
          onAnimationEnd={() => setPlayerState({ isCutting: false })}
        />
      </div>
    </div>
  )
} 

export default GameCanvas