import _ from "lodash"
import { allUpgrades } from "./allUpgrades"

export interface Upgrade {
  count: number
  price: number
}

export interface UpgradesState {
  woodcutters: Upgrade
  buldozers: Upgrade
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
}

export interface UpgradesActions {
  updateState(newState: UpgradesState): void
}

export const defaultUpgradesActions: UpgradesActions = {
  updateState: _.noop,
}