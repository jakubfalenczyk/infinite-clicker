import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { calculateGatheredMaterials } from "common/upgrades"
import { PlayerState } from "gameState/player/model"
import { UpgradesState } from "gameState/upgrades/model"

const useAutoGatherers = (autoGathererTick: React.MutableRefObject<() => void>) => {
  const { player, upgrades } = useGameState()
  
  const updateState = useRef((playerState: PlayerState, upgradesState: UpgradesState) => {
    const gathered = calculateGatheredMaterials(upgradesState)
    const gold = gathered.find(x => x.key === "gold")
    const wood = gathered.find(x => x.key === "wood")
    
    console.log(gathered)
    player.updateState({
      ...playerState,
      gold: playerState.gold + (gold ? gold.sum : 0),
      wood: playerState.wood + (wood ? wood.sum : 0)
    })
  })

  useEffect(() => {
    autoGathererTick.current = () => {
      updateState.current(player, upgrades)
    }
  }, [upgrades, player, autoGathererTick])
}

export default useAutoGatherers