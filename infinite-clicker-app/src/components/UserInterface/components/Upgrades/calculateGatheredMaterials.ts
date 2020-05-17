import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"
import { allUpgrades, Upgrade } from "./allUpgrades"
import _ from "lodash"

export const calculateGatheredMaterials = (upgrades: UpgradesState): Materials => {
  const groupedByMaterial = _.groupBy(allUpgrades, u => u.gatheredMaterial)
  
  const sumUpValues = (value: Upgrade) => {
    const count = upgrades[value.storeKey]
    return count * value.gatheredPerSec
  }

  const summedUp = _.map(groupedByMaterial, (value, key) =>
    ([ key, _.sumBy(value, v => sumUpValues(v))]))

  return Object.fromEntries(summedUp)
}