import { useRef, useEffect } from "react"
import { useSoundSettings } from "./useSoundSettings"

export interface AudioControls {
  changeTrack: (src: string) => void
  play: (soundsOnExternal?: boolean) => void
}

const useSound = (src: string, loop: boolean = false): AudioControls => {
  const audio = useRef(new Audio(src))
  const { soundsOn } = useSoundSettings()
  
  const changeTrack = (src: string) => {
    audio.current.pause()
    audio.current.src = src
  }

  const play = (soundsOnExternal?: boolean) => {
    if (soundsOnExternal || soundsOn) {
      audio.current.currentTime = 0
      audio.current.loop = loop
      audio.current.play()
    }
  }

  useEffect(() => {
    if (!soundsOn) {
      audio.current.pause()
    } else if (loop) {
      audio.current.play()
    }
  }, [soundsOn, loop])

  return {
    changeTrack,
    play,
  }
}

export default useSound