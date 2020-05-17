import _ from "lodash"

export interface Materials {
  gold: number
  wood: number
}

export interface PlayerState extends Materials {
  axeDamage: number
}

export const defaultPlayerState: PlayerState = {
  gold: 0,
  axeDamage: 10,
  wood: 0,
}

export interface PlayerActions {
  updateState(newState: PlayerState) : void
}

export const defaultPlayerActions: PlayerActions = {
  updateState: _.noop,
}