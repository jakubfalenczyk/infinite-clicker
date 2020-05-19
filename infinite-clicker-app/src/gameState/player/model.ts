import _ from "lodash"
import { Axe, allAxes } from "components/UserInterface/components/Tools/allAxes"

export interface Materials {
  gold: number
  wood: number
}

export interface PlayerState extends Materials {
  axe: Axe
}

export const defaultPlayerState: PlayerState = {
  gold: 0,
  wood: 0,
  axe: allAxes.stone,
}

export interface PlayerActions {
  updateState(newState: PlayerState) : void
}

export const defaultPlayerActions: PlayerActions = {
  updateState: _.noop,
}