import _ from "lodash"
import { allUpgrades } from "./allUpgrades"

export interface Upgrade {
  count: number
  price: number
}

export interface UpgradesState {
  woodcutters: Upgrade
  buldozers: Upgrade
  burners: Upgrade
  lumberCamps: Upgrade
  paperFactories: Upgrade
  furnitureFactories: Upgrade
}

export const defaultUpgradesState: UpgradesState = {
  woodcutters: {
    count: 0,
    price: allUpgrades.woodcutters.basePrice
  },
  buldozers: {
    count: 0,
    price: allUpgrades.buldozers.basePrice,
  },
  burners: {
    count: 0,
    price: allUpgrades.burners.basePrice,
  },
  lumberCamps: {
    count: 0,
    price: allUpgrades.lumberCamps.basePrice,
  },
  paperFactories: {
    count: 0,
    price: allUpgrades.paperFactories.basePrice,
  },
  furnitureFactories: {
    count: 0,
    price: allUpgrades.furnitureFactories.basePrice,
  }
}

export interface UpgradesActions {
  updateState(newState: UpgradesState): void
}

export const defaultUpgradesActions: UpgradesActions = {
  updateState: _.noop,
}