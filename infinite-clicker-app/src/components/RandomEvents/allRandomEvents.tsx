import React from "react"
import { RandomEventsState } from "gameState/randomEvents/model"
import Wildfire from "./Wildfire"
import Termite from "./Termite"
import { MusicType } from "gameState/music/model"

export interface RandomEventProps {
  component: JSX.Element
  key: keyof RandomEventsState
  alert: JSX.Element
  music: MusicType
}

export const allRandomEvents: Record<keyof RandomEventsState, RandomEventProps> = {
  wildfire: {
    component: <Wildfire/>,
    key: "wildfire",
    alert: <span>Wildfire is burning the forest!<br/>Stop it to continue production.</span>,
    music: "wildfire",
  },
  termites: {
    component: <Termite/>,
    key: "termites",
    alert: <span>You are under termites infestation! <br/>Stop it to continue production.</span>,
    music: "termites",
  },
}