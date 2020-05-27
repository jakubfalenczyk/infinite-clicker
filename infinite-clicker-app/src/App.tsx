import React, { useRef } from "react"
import GameCanvas from "./components/GameCanvas"
import { GameStateProvider } from "./gameState"
import { SoundSettingsProvider } from "./common/useSoundSettings"
import UserInterface from "components/UserInterface"
import { noop } from "lodash"
import { MusicProvider } from "gameState/music/useMusic"

const App = () => {
  const autoGathererTick = useRef(noop)
  useRef(setInterval(() => autoGathererTick.current(), 1000))
  
  const randomEventsTick = useRef(noop)
  useRef(setInterval(() => randomEventsTick.current(), 4.5 * 60 * 1000))

  return (
    <div>
      <GameStateProvider>
        <SoundSettingsProvider>
          <MusicProvider>
            <UserInterface 
              autoGathererTick={autoGathererTick}
              randomEventsTick={randomEventsTick}
            />
            <GameCanvas/>
          </MusicProvider>
        </SoundSettingsProvider>
      </GameStateProvider>
    </div>
  )
}

export default App
