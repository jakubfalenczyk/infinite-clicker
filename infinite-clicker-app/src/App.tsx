import React from "react"
import GameCanvas from "./components/GameCanvas"
import { GameStateProvider } from "./gameState"
import { SoundSettingsProvider } from "./common/useSoundSettings"

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
