import React from "react"
import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"
import * as _ from "lodash"

export interface Upgrade {
  label: string
  price: number
  icon: JSX.Element
  storeKey: keyof UpgradesState
  gatheredMaterial: keyof Materials
  gatheredPerSec: number
}

export const allUpgrades: Upgrade[] = [
  { 
    label: "Woodcutters",
    price: 1000,
    icon: <i className="fas fa-users"></i>,
    storeKey: "woodcutters",
    gatheredMaterial: "wood",
    gatheredPerSec: 2,
  },
  { 
    label: "Buldozers",
    price: 15000,
    icon: <i className="fas fa-truck-pickup"></i>,
    storeKey: "buldozers",
    gatheredMaterial: "wood",
    gatheredPerSec: 20,
  }
]

interface SummedMaterials {
  key: keyof Materials
  sum: number
}

export const calculateGatheredMaterials = (upgrades: UpgradesState): SummedMaterials[] => {
  const groupedByMaterial = _.groupBy(allUpgrades, u => u.gatheredMaterial)
  
  const sumUpValues = (value: Upgrade) => {
    const count = upgrades[value.storeKey]
    console.log(value.storeKey, count)
    return count * value.gatheredPerSec
  }

  const summedUp = _.map(groupedByMaterial, (value, key) =>
    ({ key: key as keyof Materials, sum: _.sumBy(value, v => sumUpValues(v))}))

  return summedUp
}
