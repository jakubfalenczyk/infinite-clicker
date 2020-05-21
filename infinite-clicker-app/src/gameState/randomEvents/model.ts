import _ from "lodash"

export interface RandomEvent {
  count: number
  key: keyof RandomEventsState
}

export interface RandomEventsState {
  wildfire: RandomEvent
  termites: RandomEvent
}

export const defaultRandomEventsState: RandomEventsState = {
  wildfire: {
    count: 0,
    key: "wildfire",
  },
  termites: {
    count: 0,
    key: "termites",
  },
}

export interface RandomEventsActions {
  updateState(newState: RandomEventsState) : void
}

export const defaultRandomEventsActions: RandomEventsActions = {
  updateState: _.noop,
}