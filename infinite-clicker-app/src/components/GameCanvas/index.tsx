import React, { useState } from "react"
import "./styles.scss"
import Player from "../Player"
import Tree from "../Tree"
import treeTypes from "./treeTypes"
import HealthBar from "../HealthBar"
import { getRandomItem } from "../../common/random"
import { useGameState } from "../../gameState"
import PlayerStats from "../PlayerStats"
import { choppingSounds } from "../../sounds"
import Settings from "../Settings"
import useSound from "../../common/useSound"
import useMusic from "../../common/useMusic"

const GameCanvas = ()  => {
  const { player, tree } = useGameState()
  const [ treeState, setTreeState ] = useState({ type: treeTypes[0] })
  const [ playerState, setPlayerState ] = useState({ isCutting: false })
  const choppingAudio = useSound(getRandomItem(choppingSounds))
  const treeFallAudio = useSound("/assets/sounds/tree-fall.mp3")
  useMusic("/assets/sounds/bg-sound-1.mp3")

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
    const validatedLife = isTreeDead ? tree.maxLife : newTreeLife
    tree.updateCurrentLife(validatedLife)

    if (isTreeDead) {
      player.addWood(tree.wood)
      cutDownTree()
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
      <Settings/>
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
  )
} 

export default GameCanvas