import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"
import { calculateGatheredMaterials } from "components/UserInterface/components/Upgrades/calculateGatheredMaterials"
import { AchievementsState } from "gameState/achievements/model"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades, achievements } = useGameState()
  
  const updatePlayerState = useRef((playerState: PlayerState, upgradesState: UpgradesState, achievementsState: AchievementsState) => {
    const updatedPlayerState = calculateGatheredMaterials(upgradesState, playerState, achievementsState)
    
    player.updateState({
      ...playerState,
      ...updatedPlayerState,
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updatePlayerState.current(player, upgrades, achievements)
    }
  }, [upgrades, player, achievements, autoGathererTick])
}

export default useAutoGatherers