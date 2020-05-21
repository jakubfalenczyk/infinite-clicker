import React from "react"
import { RandomEventsState } from "gameState/randomEvents/model"
import Wildfire from "./Wildfire"

export interface RandomEventProps {
  component: JSX.Element
  key: keyof RandomEventsState
}

export const allRandomEvents: Record<keyof RandomEventsState, RandomEventProps> = {
  wildfire: {
    component: <Wildfire/>,
    key: "wildfire",
  },
  termites: {
    component: <div>termite</div>,
    key: "termites",
  },
}