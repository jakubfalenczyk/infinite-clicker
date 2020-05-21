import React, { useRef } from "react"
import GameCanvas from "./components/GameCanvas"
import { GameStateProvider } from "./gameState"
import { SoundSettingsProvider } from "./common/useSoundSettings"
import UserInterface from "components/UserInterface"
import { noop } from "lodash"

const App = () => {
  const autoGathererTick = useRef(noop)
  useRef(setInterval(() => autoGathererTick.current(), 1000))
  
  const randomEventsTick = useRef(noop)
  useRef(setInterval(() => randomEventsTick.current(), 5000))

  return (
    <div>
      <GameStateProvider>
        <SoundSettingsProvider>
          <UserInterface 
            autoGathererTick={autoGathererTick}
            randomEventsTick={randomEventsTick}
          />
          <GameCanvas/>
        </SoundSettingsProvider>
      </GameStateProvider>
    </div>
  )
}

export default App
