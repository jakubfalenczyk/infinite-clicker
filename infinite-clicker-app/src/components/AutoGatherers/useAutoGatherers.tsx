import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"
import { calculateGatheredMaterials } from "components/UserInterface/components/Upgrades/calculateGatheredMaterials"
import { RandomEventsState } from "gameState/randomEvents/model"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades, randomEvents } = useGameState()
  
  const updatePlayerState = useRef((playerState: PlayerState, upgradesState: UpgradesState, randomEventsState: RandomEventsState) => {
    const isEventHappening =
      randomEventsState.wildfire.count > 0 
      || randomEventsState.termites.count > 0
    
    if (isEventHappening) {
      return
    }
    
    const updatedPlayerState = calculateGatheredMaterials(upgradesState, playerState)
    
    player.updateState({
      ...playerState,
      ...updatedPlayerState,
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updatePlayerState.current(player, upgrades, randomEvents)
    }
  }, [upgrades, player, randomEvents, autoGathererTick])
}

export default useAutoGatherers