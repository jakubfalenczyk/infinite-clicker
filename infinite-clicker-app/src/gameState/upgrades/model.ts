import _ from "lodash"

export interface UpgradesState {
  woodcutters: number
}

export const defaultUpgradesState: UpgradesState = {
  woodcutters: 0,
}

export interface UpgradesActions {
  updateUpgrades(newState: UpgradesState): void
}

export const defaultUpgradesActions: UpgradesActions = {
  updateUpgrades: _.noop,
}