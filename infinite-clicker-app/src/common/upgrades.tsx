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
