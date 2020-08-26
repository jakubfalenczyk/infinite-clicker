import React from "react"
import "./styles.scss"
import { allRandomEvents } from "./allRandomEvents"
import { useGameState } from "gameState"
import { RandomEvent } from "gameState/randomEvents/model"
import useMusic from "gameState/music/useMusic"
import { useSoundSettings } from "common/useSoundSettings"
import { allMarketGoods } from "components/UserInterface/components/Market/allMarketGoods"
import ReactGA from "react-ga"

const RandomEventSpawner = () => {
  const { soundsOn } = useSoundSettings()
  const { randomEvents, player } = useGameState()
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

          if (e.materialsPerClick) {
            const clickedMaterials = e.materialsPerClick[index]
            player.updateState({
              ...player,
              [eventProps.materialOnClick]: player[eventProps.materialOnClick] + clickedMaterials
            })
            e.materialsPerClick.splice(index, 1)
          }

          randomEvents.updateState({
            ...randomEvents,
            [e.key]: { key: e.key, count: e.count - 1, positions: e.positions, materialsPerClick: e.materialsPerClick }
          })

          if (e.positions.length === 0) {
            ReactGA.event({
              category: "Random Events",
              action: "Cleared up the whole event",
              label: eventProps.key,
            })

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
            {e.materialsPerClick && 
              <div className="materialOnClick">
                <span>{e.materialsPerClick[index]}</span>
                {allMarketGoods[eventProps.materialOnClick].icon}
              </div>
            }
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