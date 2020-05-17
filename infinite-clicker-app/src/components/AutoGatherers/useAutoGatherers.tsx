import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { PlayerState, Materials } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"
import { calculateGatheredMaterials } from "components/UserInterface/components/Upgrades/calculateGatheredMaterials"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades } = useGameState()
  
  const updatePlayerState = useRef((playerState: PlayerState, upgradesState: UpgradesState) => {
    const gathered = calculateGatheredMaterials(upgradesState)
    const updatedEntries = Object.entries(gathered).map(entry => {
      const key = entry[0] as keyof Materials
      return [ entry[0], entry[1] + playerState[key] ]
    })
    const updatedState = Object.fromEntries(updatedEntries)
    
    player.updateState({
      ...playerState,
      ...updatedState
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updatePlayerState.current(player, upgrades)
    }
  }, [upgrades, player, autoGathererTick])
}

export default useAutoGatherers