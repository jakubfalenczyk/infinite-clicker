import React from "react"
import GameCanvas from "./features/GameCanvas"
import AudioContainer from "./features/AudioContainer"

const App = () => {
  return (
    <div>
      <GameCanvas/>
      <AudioContainer isPlaying={true} src="/assets/sounds/bg-sound-1.mp3"/>
    </div>
  )
}

export default App
