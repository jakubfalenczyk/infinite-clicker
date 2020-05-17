import React from "react"
import { UpgradesState } from "gameState/upgrades/model";

export interface Upgrade {
  label: string
  price: number
  icon: JSX.Element
  storeKey: keyof UpgradesState
  goldPerSec: number
}

export const allUpgrades: Upgrade[] = [
  { 
    label: "Woodcutters",
    price: 1000,
    icon: <i className="fas fa-users"></i>,
    storeKey: "woodcutters",
    goldPerSec: 2,
  }
]

export const calculateGoldPerSec = (upgrades: UpgradesState) => {
  const goldPerSecMap = Object.keys(upgrades).map(x => {
    const key = x as keyof UpgradesState
    const upgradeProps = allUpgrades.find(y => y.storeKey === x)
    return upgradeProps ? upgrades[key] * upgradeProps.goldPerSec : 0
  })

  const sum = goldPerSecMap.reduce((a, b) => a + b)
  return sum
}
