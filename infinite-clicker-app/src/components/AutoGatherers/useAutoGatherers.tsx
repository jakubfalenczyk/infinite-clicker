import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"
import { calculateGatheredMaterials } from "components/UserInterface/components/Upgrades/calculateGatheredMaterials"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades } = useGameState()
  
  const updatePlayerState = useRef((playerState: PlayerState, upgradesState: UpgradesState) => {
    const updatedPlayerState = calculateGatheredMaterials(upgradesState, playerState)
    
    player.updateState({
      ...playerState,
      ...updatedPlayerState,
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updatePlayerState.current(player, upgrades)
    }
  }, [upgrades, player, autoGathererTick])
}

export default useAutoGatherers