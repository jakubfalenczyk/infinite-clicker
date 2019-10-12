import { useState } from "react"
import { useSoundSettings } from "../features/Settings/useSoundSettings"

interface AudioControls {
  changeTrack: (src: string) => void
  play: () => void
}

const useSound = (src: string): AudioControls => {
  const [audio, setAudio] = useState(new Audio(src))
  const { soundsOn } = useSoundSettings()
  
  const changeTrack = (src: string) => {
    setAudio(new Audio(src))
  }

  const play = () => {
    if (soundsOn) {
      audio.currentTime = 0
      audio.play()
    }
  }

  return {
    changeTrack,
    play,
  }
}

export default useSound