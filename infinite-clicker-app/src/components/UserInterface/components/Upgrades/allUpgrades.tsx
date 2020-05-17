import React from "react"
import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"

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
