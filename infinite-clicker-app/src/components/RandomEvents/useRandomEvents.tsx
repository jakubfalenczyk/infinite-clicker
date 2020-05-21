import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { RandomEventsState } from "gameState/randomEvents/model"
import { getRandomItem } from "common/random"
import { allRandomEvents } from "./allRandomEvents"

const useRandomEvents = (tick: React.MutableRefObject<() => void>) => {
  const { randomEvents } = useGameState()
  
  const update = useRef((randomEventsState: RandomEventsState) => {
    console.log("TICK")
    const event = getRandomItem([allRandomEvents.wildfire, allRandomEvents.termites])
    const count = Math.floor(Math.random() * 10)
    
    randomEvents.updateState({
      ...randomEventsState,
      [event.key]: { count, key: event.key } 
    })
  })

  useEffect(() => {
    tick.current = () => {
      update.current(randomEvents)
    }
  }, [tick, randomEvents])
}

export default useRandomEvents