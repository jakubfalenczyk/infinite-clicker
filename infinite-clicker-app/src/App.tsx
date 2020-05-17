import React from "react"
import GameCanvas from "./components/GameCanvas"
import { GameStateProvider } from "./gameState"
import { SoundSettingsProvider } from "./common/useSoundSettings"
import useAutoGatherers from "components/AutoGatherers/useAutoGatherers"

const App = () => {
  useAutoGatherers()

  return (
    <div>
      <GameStateProvider>
        <SoundSettingsProvider>
          <GameCanvas/>
        </SoundSettingsProvider>
      </GameStateProvider>
    </div>
  )
}

export default App
