import _ from "lodash"

export interface PlayerState {
  wood: number
  gold: number
  axeDamage: number
}

export const defaultPlayerState: PlayerState = {
  gold: 0,
  axeDamage: 10,
  wood: 0,
}

export interface PlayerActions {
  addWood(wood: number): void
  updateAxeDamage(newDamage: number): void
}

export const defaultPlayerActions: PlayerActions = {
  addWood: _.noop,
  updateAxeDamage: _.noop,
}