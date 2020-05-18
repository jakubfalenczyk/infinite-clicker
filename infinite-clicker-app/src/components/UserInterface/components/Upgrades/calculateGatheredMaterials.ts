import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"
import _ from "lodash"
import { allUpgrades, UpgradeParams } from "gameState/upgrades/allUpgrades"

export const calculateGatheredMaterials = (upgrades: UpgradesState): Materials => {
  const groupedByMaterial = _.groupBy(allUpgrades, u => u.gatheredMaterial)
  
  const sumUpValues = (value: UpgradeParams) => {
    const count = upgrades[value.key].count
    return count * value.gatheredPerSec
  }

  const summedUp = _.map(groupedByMaterial, (value, key) =>
    ([ key, _.sumBy(value, v => sumUpValues(v))]))

  return Object.fromEntries(summedUp)
}