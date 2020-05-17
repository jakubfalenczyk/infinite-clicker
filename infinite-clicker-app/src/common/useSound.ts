import { useRef } from "react"
import { useSoundSettings } from "./useSoundSettings"

export interface AudioControls {
  changeTrack: (src: string) => void
  play: () => void
}

const useSound = (src: string): AudioControls => {
  const audio = useRef(new Audio(src))
  const { soundsOn } = useSoundSettings()
  
  const changeTrack = (src: string) => {
    audio.current = new Audio(src)
  }

  const play = () => {
    if (soundsOn) {
      audio.current.currentTime = 0
      audio.current.play()
    }
  }

  return {
    changeTrack,
    play,
  }
}

export default useSound