import React from "react"
import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"

export interface UpgradeParams {
  key: keyof UpgradesState
  label: string
  basePrice: number
  priceMultiplier: number
  icon: JSX.Element
  gatheredMaterial: keyof Materials
  gatheredPerSec: number
}

export const allUpgrades: Record<keyof UpgradesState, UpgradeParams> = {
  woodcutters: {
    key: "woodcutters",
    label: "Woodcutters",
    basePrice: 1000,
    priceMultiplier: 1.1,
    icon: <i className="fas fa-users"></i>,
    gatheredMaterial: "wood",
    gatheredPerSec: 2,
  },
  buldozers: { 
    key: "buldozers",
    label: "Buldozers",
    basePrice: 25000,
    priceMultiplier: 1.2,
    icon: <i className="fas fa-truck-pickup"></i>,
    gatheredMaterial: "wood",
    gatheredPerSec: 10,
  }
}