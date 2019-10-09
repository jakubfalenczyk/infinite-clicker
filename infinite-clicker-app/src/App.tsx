import React from "react"
import GameCanvas from "./features/GameCanvas"
import { GameStateProvider } from "./gameState/reducer"

const App = () => {
  return (
    <div>
      <GameStateProvider>
        <GameCanvas/>
      </GameStateProvider>
    </div>
  )
}

export default App
