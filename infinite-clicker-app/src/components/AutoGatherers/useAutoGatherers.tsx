import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { calculateGoldPerSec } from "common/upgrades"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades } = useGameState()
  
  const updateGold = useRef((playerState: PlayerState, upgradesState: UpgradesState) => {
    const allGoldPerTick = calculateGoldPerSec(upgradesState)
    player.updateState({
      ...playerState,
      gold: playerState.gold + allGoldPerTick
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updateGold.current(player, upgrades)
    }
  }, [upgrades, player, autoGathererTick])
}

export default useAutoGatherers