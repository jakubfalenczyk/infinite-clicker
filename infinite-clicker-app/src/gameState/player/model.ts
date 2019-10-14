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
  updateState(newState: Partial<PlayerState>) : void
}

export const defaultPlayerActions: PlayerActions = {
  updateState: _.noop,
}