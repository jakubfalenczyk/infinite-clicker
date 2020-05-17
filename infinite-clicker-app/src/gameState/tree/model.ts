import _ from "lodash"
import treeTypes from "components/Tree/treeTypes"

export interface TreeState {
  maxLife: number
  currentLife: number
  wood: number
  type: string
}

export const defaultTreeState: TreeState = {
  maxLife: 100,
  currentLife: 100,
  wood: 10,
  type: treeTypes[0]
}

export interface TreeActions {
  updateState(newState: TreeState): void
}

export const defaultTreeActions: TreeActions = {
  updateState: _.noop,
}