import React from "react"
import "./styles.scss"
import { allRandomEvents } from "./allRandomEvents"
import { useGameState } from "gameState"
import { RandomEvent } from "gameState/randomEvents/model"
import useMusic from "gameState/music/useMusic"
import { useSoundSettings } from "common/useSoundSettings"

const RandomEventSpawner = () => {
  const { soundsOn } = useSoundSettings()
  const { randomEvents } = useGameState()
  const { wildfire, termites } = randomEvents
  const events = [ wildfire, termites ]
  const { changeMusic } = useMusic()

  const populateEvents = (e: RandomEvent): RandomEvent[] => {
    return Array.from({length: e.count}, () => e)
  }

  const mapEvent = (events: RandomEvent[]): JSX.Element[] => {
    return (
      events.map((e, index) => {
        const eventProps = allRandomEvents[e.key]

        const onClick = () => {
          e.positions.splice(index, 1)
          randomEvents.updateState({
            ...randomEvents,
            [e.key]: { key: e.key, count: e.count - 1, positions: e.positions }
          })

          if (e.positions.length === 0) {
            changeMusic("bg", soundsOn)
          }
        }

        return (
          <div 
            key={`${e.key}-${index}`}
            className="randomEventElement"
            style={e.positions[index]}
            onClick={() => onClick()}
          >
            {eventProps.component}
          </div>
        )
      })
    )
  }

  return (
    <>
      {events.map(populateEvents).map(mapEvent)}
    </>
  )
}

export default RandomEventSpawner