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
  updateTreeState(newState: TreeState): void
}

export const defaultTreeActions: TreeActions = {
  updateTreeState: _.noop,
}