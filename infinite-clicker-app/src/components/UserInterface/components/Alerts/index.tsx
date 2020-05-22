import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allRandomEvents } from "components/RandomEvents/allRandomEvents"
import { RandomEvent } from "gameState/randomEvents/model"

const Alerts = () => {
  const { randomEvents } = useGameState()
  const isEventHappening = 
    randomEvents.wildfire.count > 0 
    || randomEvents.termites.count > 0
  const ongoingEvent = Object.values(randomEvents).find(e => e.count > 0) as RandomEvent

  return (
    <div className="alerts">
      <div className="message">
        {isEventHappening &&
          <h2>{allRandomEvents[ongoingEvent.key].alert}</h2>
        }
      </div>
    </div>
  )
}

export default Alerts