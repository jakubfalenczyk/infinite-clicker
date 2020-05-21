import React from "react"
import { UpgradesState } from "gameState/upgrades/model"
import { Materials } from "gameState/player/model"

export interface UpgradeParams {
  key: keyof UpgradesState
  label: string
  basePrice: number
  priceMultiplier: number
  icon: JSX.Element
  usedMaterial?: keyof Materials
  usedPerSec?: number
  gatheredMaterial: keyof Materials
  gatheredPerSec: number
}

export const allUpgrades: Record<keyof UpgradesState, UpgradeParams> = {
  woodcutters: {
    key: "woodcutters",
    label: "Woodcutters",
    basePrice: 1000,
    priceMultiplier: 1.05,
    icon: <i className="fas fa-users"></i>,
    gatheredMaterial: "wood",
    gatheredPerSec: 2,
  },
  buldozers: { 
    key: "buldozers",
    label: "Buldozers",
    basePrice: 25000,
    priceMultiplier: 1.07,
    icon: <i className="fas fa-truck-pickup"></i>,
    gatheredMaterial: "wood",
    gatheredPerSec: 10,
  },
  burners: { 
    key: "burners",
    label: "Charcoal burners",
    basePrice: 125000,
    priceMultiplier: 1.17,
    icon: <i className="fas fa-burn"></i>,
    gatheredMaterial: "charcoal",
    gatheredPerSec: 4,
    usedMaterial: "wood",
    usedPerSec: 10,
  },
  lumberCamps: {
    key: "lumberCamps",
    label: "Lumber camps",
    basePrice: 250000,
    priceMultiplier: 1.23,
    icon: <i className="fas fa-campground"></i>,
    gatheredMaterial: "plank",
    gatheredPerSec: 8,
    usedMaterial: "wood",
    usedPerSec: 20,
  },
  paperFactories: {
    key: "paperFactories",
    label: "Paper factories",
    basePrice: 1000000,
    priceMultiplier: 1.25,
    icon: <i className="fas fa-warehouse"></i>,
    gatheredMaterial: "paper",
    gatheredPerSec: 10,
    usedMaterial: "wood",
    usedPerSec: 50,
  },
  furnitureFactories: {
    key: "furnitureFactories",
    label: "Furniture factories",
    basePrice: 5000000,
    priceMultiplier: 1.3,
    icon: <i className="fas fa-city"></i>,
    gatheredMaterial: "furniture",
    gatheredPerSec: 2,
    usedMaterial: "plank",
    usedPerSec: 10,
  }
}