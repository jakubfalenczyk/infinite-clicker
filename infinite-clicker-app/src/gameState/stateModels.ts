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

export interface TreeState {
  maxLife: number
  currentLife: number
  wood: number
}

export const defaultTreeState: TreeState = {
  maxLife: 100,
  currentLife: 100,
  wood: 10,
}

export interface TreeActions {
  updateMaxLife(newLife: number): void
  updateCurrentLife(newLife: number): void
}

export const defaultTreeActions: TreeActions = {
  updateMaxLife: _.noop,
  updateCurrentLife: _.noop,
}