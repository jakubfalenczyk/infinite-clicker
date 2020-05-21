import React from "react"
import "./styles.scss"
import { allRandomEvents } from "./allRandomEvents"
import { getRandomItem } from "common/random"
import { randomPositions } from "./randomPositions"
import { useGameState } from "gameState"
import { RandomEvent } from "gameState/randomEvents/model"

const RandomEventSpawner = () => {
  const { randomEvents: { wildfire, termites } } = useGameState()
  const events = [ wildfire, termites ]
  
  const mapEvent = (e: RandomEvent) => {
    const pos = getRandomItem(randomPositions)
    return (
      <div className="randomEventElement" style={pos}>
        {allRandomEvents[e.key].component}
      </div>
    )
  }

  return (
    <>
      {events.map(mapEvent)}
    </>
  )
}

export default RandomEventSpawner