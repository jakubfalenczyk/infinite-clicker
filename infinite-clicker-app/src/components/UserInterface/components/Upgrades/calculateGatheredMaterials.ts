import { UpgradesState } from "gameState/upgrades/model"
import { PlayerState } from "gameState/player/model"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

export const calculateGatheredMaterials = (upgrades: UpgradesState, player: PlayerState): PlayerState => {
  const updatedPlayerState = {...player}
  
  Object.values(allUpgrades).forEach(x => {
    const count = upgrades[x.key].count
    const gatheredMaterials = count * x.gatheredPerSec

    if (x.usedMaterial && x.usedPerSec) {
      const usedMaterials = count * x.usedPerSec
      
      if (updatedPlayerState[x.usedMaterial] >= usedMaterials) {
        updatedPlayerState[x.usedMaterial] = updatedPlayerState[x.usedMaterial] - usedMaterials
        updatedPlayerState[x.gatheredMaterial] = updatedPlayerState[x.gatheredMaterial] + gatheredMaterials
      }
    } else {
      updatedPlayerState[x.gatheredMaterial] = updatedPlayerState[x.gatheredMaterial] + gatheredMaterials
    }
  })

  return updatedPlayerState
}