import { UpgradesState } from "gameState/upgrades/model"
import { PlayerState } from "gameState/player/model"
import { allUpgrades } from "gameState/upgrades/allUpgrades"
import { AchievementsState } from "gameState/achievements/model"
import { allAchievements } from "../Achievements/allAchievements"

export const calculateGatheredMaterials = (upgrades: UpgradesState, player: PlayerState, achievements: AchievementsState): PlayerState => {
  const updatedPlayerState = {...player}
  
  Object.values(allUpgrades).forEach(x => {
    const count = upgrades[x.key].count
    const gatheredFromUpgrades = count * x.gatheredPerSec
    const achievementsFilteredByMaterialBoosted = achievements.unlocked
      .map(a => allAchievements.find(b => a.id === b.id))
      .filter(a => a !== undefined)
      .map(a => a!)
      .filter(a => a.boostedResource === x.gatheredMaterial)
    const boostingAchievement = 
      achievementsFilteredByMaterialBoosted && achievementsFilteredByMaterialBoosted.length > 0 
      ?
        achievementsFilteredByMaterialBoosted.reduce((a, b) => ({
          ...a,
          boostValue: a.boostValue + b.boostValue
        }
      )) 
      : { boostValue: 0 }

    const materialsFromBoost = Math.ceil(gatheredFromUpgrades * (boostingAchievement.boostValue / 100))
    const gatheredMaterials = gatheredFromUpgrades + materialsFromBoost

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