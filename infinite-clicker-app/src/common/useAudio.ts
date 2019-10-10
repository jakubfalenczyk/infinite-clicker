import { useState } from "react"

interface AudioControls {
  changeTrack: (src: string) => void
  play: () => void
}

const useAudio = (src: string): AudioControls => {
  const [audio, setAudio] = useState(new Audio(src))
  
  const changeTrack = (src: string) => {
    setAudio(new Audio(src))
  }

  const play = () => {
    audio.currentTime = 0
    audio.play()
  }

  return {
    changeTrack,
    play
  }
}

export default useAudio