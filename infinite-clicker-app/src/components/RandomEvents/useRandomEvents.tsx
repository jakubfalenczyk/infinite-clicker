import { useRef, useEffect } from "react"
import { useGameState } from "gameState"
import { RandomEventsState } from "gameState/randomEvents/model"
import { getRandomItem, getDistinctRandomItems } from "common/random"
import { allRandomEvents } from "./allRandomEvents"
import { randomPositions } from "./randomPositions"
import useMusic from "gameState/music/useMusic"
import { music } from "sounds"
import { useSoundSettings } from "common/useSoundSettings"

const useRandomEvents = (tick: React.MutableRefObject<() => void>) => {
  const { randomEvents } = useGameState()
  const soundSettings = useSoundSettings()
  const bgMusic = useMusic()
  
  const update = useRef((randomEventsState: RandomEventsState, soundsOn: boolean) => {
    const isEventHappening = 
      randomEventsState.wildfire.count > 0 
      || randomEventsState.termites.count > 0
    
    if (isEventHappening) {
      return
    }

    const event = getRandomItem([allRandomEvents.wildfire, allRandomEvents.termites])
    const count = Math.floor(Math.random() * 10) + 1
    const positions = getDistinctRandomItems(randomPositions, count)
    
    randomEvents.updateState({
      ...randomEventsState,
      [event.key]: { count, key: event.key, positions }
    })

    bgMusic.changeTrack(music.danger)
    bgMusic.play(soundsOn)
  })

  useEffect(() => {
    tick.current = () => {
      update.current(randomEvents, soundSettings.soundsOn)
    }
  }, [tick, randomEvents, soundSettings.soundsOn])
}

export default useRandomEvents