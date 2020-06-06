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
import { useSoundSettings } from "common/useSoundSettings"

interface TreeProps {
  setPlayerVisualState(newState: PlayerVisualState): void
}

const Tree = (props: TreeProps) => {
  const treeFallAudio = useSound(treeFallSound)
  const chop1 = useSound(choppingSounds[0])
  const chop2 = useSound(choppingSounds[1])
  const chop3 = useSound(choppingSounds[2])
  const soundSettings = useSoundSettings()

  const { tree, player } = useGameState()
  
  const [ isBouncing, setIsBouncing ] = useState(false)
  const treeClassName = classnames("tree", tree.type, { "bounce": isBouncing })

  const onTreeClick = () => {
    const newChoppingSound = getRandomItem([chop1, chop2, chop3])

    const newTreeLife = tree.currentLife - player.axe.damage
    const isTreeDead = newTreeLife <= 0
    const updatedLife = isTreeDead ? tree.maxLife : newTreeLife

    const updatePlayerState = () => player.updateState({
      ...player,
      wood: isTreeDead ? player.wood + tree.wood : player.wood,
      cutDownTrees: isTreeDead ? player.cutDownTrees + 1 : player.cutDownTrees,
    })

    const updateTreeState = () => tree.updateState({
      ...tree,
      currentLife: updatedLife,
      type: isTreeDead ? getRandomItem(treeTypes, tree.type) : tree.type,
    })

    const playChoppingAudio = () => newChoppingSound.play(soundSettings.soundsOn)
    const playTreeFallAudio = () => treeFallAudio.play(soundSettings.soundsOn)

    treeClickedThrottled.current({
      updatePlayerState,
      updateTreeState,
      isTreeDead,
      playChoppingAudio,
      playTreeFallAudio,
    })
  }

  const treeClicked = (request: TreeClickedParams) => {
    setIsBouncing(true)
    request.playChoppingAudio()

    if (request.isTreeDead) {
      request.playTreeFallAudio()
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