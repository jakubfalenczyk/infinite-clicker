import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { RandomEventsState } from "gameState/randomEvents/model"
import { getRandomItem } from "common/random"
import { allRandomEvents } from "./allRandomEvents"
import { getRandomPositions } from "./randomPositions"
import useMusic from "gameState/music/useMusic"
import { useSoundSettings } from "common/useSoundSettings"

const useRandomEvents = (tick: React.MutableRefObject<() => void>) => {
  const { randomEvents } = useGameState()
  const soundSettings = useSoundSettings()
  const { changeMusic } = useMusic()

  useEffect(() => {
    const wildfire = randomEvents.wildfire.count 
      && allRandomEvents[randomEvents.wildfire.key]
    const termites = randomEvents.termites.count 
      && allRandomEvents[randomEvents.termites.key]

    const currentEvent = wildfire || termites
    
    if (currentEvent) {
      changeMusic(currentEvent.music, soundSettings.soundsOn)
    }
  }, [randomEvents, changeMusic, soundSettings.soundsOn])
  
  const update = useRef((randomEventsState: RandomEventsState, soundsOn: boolean) => {
    const isEventHappening = 
      randomEventsState.wildfire.count > 0 
      || randomEventsState.termites.count > 0
    
    if (isEventHappening) {
      return
    }

    const event = getRandomItem([allRandomEvents.wildfire, allRandomEvents.termites])
    const count = Math.floor(Math.random() * 6) + 6
    const positions = getRandomPositions(count)
    
    randomEvents.updateState({
      ...randomEventsState,
      [event.key]: { count, key: event.key, positions }
    })
  })

  useEffect(() => {
    tick.current = () => {
      update.current(randomEvents, soundSettings.soundsOn)
    }
  }, [tick, randomEvents, soundSettings.soundsOn])
}

export default useRandomEvents