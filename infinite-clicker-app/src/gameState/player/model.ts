import _ from "lodash"
import { Axe, allAxes } from "components/UserInterface/components/Tools/allAxes"

export interface Materials {
  wood: number
  charcoal: number
  plank: number
  paper: number
  furniture: number
}

export interface PlayerState extends Materials {
  gold: number
  axe: Axe
  cutDownTrees: number
  gameReset: number
}

export const defaultPlayerState: PlayerState = {
  gold: 0,
  wood: 0,
  charcoal: 0,
  plank: 0,
  paper: 0,
  furniture: 0,
  cutDownTrees: 0,
  gameReset: 0,
  axe: allAxes.stone,
}

export interface PlayerActions {
  updateState(newState: PlayerState) : void
}

export const defaultPlayerActions: PlayerActions = {
  updateState: _.noop,
}