import React from "react"
import { RandomEventsState } from "gameState/randomEvents/model"
import Wildfire from "./Wildfire"
import Termite from "./Termite"
import { MusicType } from "gameState/music/model"
import { Materials } from "gameState/player/model"

export interface RandomEventProps {
  component: JSX.Element
  key: keyof RandomEventsState
  alert: JSX.Element
  music: MusicType
  materialOnClick: keyof Materials
}

export const allRandomEvents: Record<keyof RandomEventsState, RandomEventProps> = {
  wildfire: {
    component: <Wildfire/>,
    key: "wildfire",
    alert: <span>
      Wildfire is burning the forest!<br/>
      Stop it to get more charcoal.<br/>
      <span className="guide">(click on a fire to extinguish it)</span>
    </span>,
    music: "wildfire",
    materialOnClick: "charcoal",
  },
  termites: {
    component: <Termite/>,
    key: "termites",
    alert: <span>
      Termites are attacking!<br/>
      Stop them to get more wood.<br/>
      <span className="guide">(click on a termite to squish it)</span>
    </span>,
    music: "termites",
    materialOnClick: "wood",
  },
}