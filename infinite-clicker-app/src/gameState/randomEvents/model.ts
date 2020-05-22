import _ from "lodash"
import { CSSProperties } from "react"

export interface RandomEvent {
  count: number
  key: keyof RandomEventsState
  positions: CSSProperties[]
}

export interface RandomEventsState {
  wildfire: RandomEvent
  termites: RandomEvent
}

export const defaultRandomEventsState: RandomEventsState = {
  wildfire: {
    count: 0,
    key: "wildfire",
    positions: [],
  },
  termites: {
    count: 0,
    key: "termites",
    positions: [],
  },
}

export interface RandomEventsActions {
  updateState(newState: RandomEventsState) : void
}

export const defaultRandomEventsActions: RandomEventsActions = {
  updateState: _.noop,
}