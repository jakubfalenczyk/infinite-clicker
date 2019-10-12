import React from "react"
import GameCanvas from "./features/GameCanvas"
import { GameStateProvider } from "./gameState"
import { SoundSettingsProvider } from "./features/Settings/useSoundSettings"

const App = () => {
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
