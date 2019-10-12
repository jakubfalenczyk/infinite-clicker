import _ from "lodash"

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