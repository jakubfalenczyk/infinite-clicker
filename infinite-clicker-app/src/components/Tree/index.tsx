import React, { useState, useRef } from "react"
import classnames from "classnames"
import "./styles.scss"
import { useGameState } from "gameState"
import treeTypes from "components/Tree/treeTypes"
import { getRandomItem } from "common/random"
import useSound from "common/useSound"
import { treeFallSound, choppingSounds } from "sounds"
import { throttle } from "lodash"
import { TreeClickedParams } from "./treeClickParams"
import { PlayerVisualState } from "components/GameCanvas/playerVisualState"

interface TreeProps {
  setPlayerVisualState(newState: PlayerVisualState): void
}

const Tree = (props: TreeProps) => {
  const treeFallAudio = useSound(treeFallSound)
  const lastChoppingSound = useRef(choppingSounds[0])
  const choppingAudio = useSound(lastChoppingSound.current)

  const { tree, player } = useGameState()
  
  const [ isBouncing, setIsBouncing ] = useState(false)
  const treeClassName = classnames("tree", tree.type, { "bounce": isBouncing })

  const onTreeClick = () => {
    const newChoppingSound = getRandomItem(choppingSounds, lastChoppingSound.current)
    choppingAudio.changeTrack(newChoppingSound)

    const newTreeLife = tree.currentLife - player.axe.damage
    const isTreeDead = newTreeLife <= 0
    const updatedLife = isTreeDead ? tree.maxLife : newTreeLife

    const updatePlayerState = () => player.updateState({
      ...player,
      wood: isTreeDead ? player.wood + tree.wood : player.wood,
    })

    const updateTreeState = () => tree.updateState({
      ...tree,
      currentLife: updatedLife,
      type: isTreeDead ? getRandomItem(treeTypes, tree.type) : tree.type,
    })

    treeClickedThrottled.current({
      updatePlayerState,
      updateTreeState,
      isTreeDead,
    })
  }

  const treeClicked = (request: TreeClickedParams) => {
    setIsBouncing(true)
    choppingAudio.play()

    if (request.isTreeDead) {
      treeFallAudio.play()
    }

    request.updatePlayerState()
    request.updateTreeState()
    props.setPlayerVisualState({ isCutting: true })
  }

  const treeClickedThrottled = useRef(
    throttle(treeClicked, 100, { trailing: false })
  )

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