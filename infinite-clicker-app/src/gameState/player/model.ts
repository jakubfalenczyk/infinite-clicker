import _ from "lodash"
import { Axe, allAxes } from "components/UserInterface/components/Tools/allAxes"
import { gameResetBasePrice } from "components/UserInterface/components/Advance"

export interface Materials {
  wood: number
  charcoal: number
  plank: number
  paper: number
  furniture: number
}

export interface PlayerState extends Materials {
  gold: number
  goldEarnedFromStart: number
  axe: Axe
  cutDownTrees: number
  gameReset: number
  marketPriceMultiplier: number
  gameResetPrice: number
  isNewPlayer: boolean
}

export const defaultPlayerState: PlayerState = {
  gold: 0,
  goldEarnedFromStart: 0,
  wood: 0,
  charcoal: 0,
  plank: 0,
  paper: 0,
  furniture: 0,
  cutDownTrees: 0,
  gameReset: 0,
  marketPriceMultiplier: 1,
  gameResetPrice: gameResetBasePrice,
  axe: allAxes.stone,
  isNewPlayer: true,
}

export interface PlayerActions {
  updateState(newState: PlayerState) : void
}

export const defaultPlayerActions: PlayerActions = {
  updateState: _.noop,
}