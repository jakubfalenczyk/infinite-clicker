import { useRef } from "react"
import { useSoundSettings } from "./useSoundSettings"

export interface AudioControls {
  src: string
  changeTrack: (src: string) => void
  play: (soundsOnExternal?: boolean) => void
  stop: () => void
}

const useSound = (src: string, loop: boolean = false): AudioControls => {
  const lastSrc = useRef(src)
  const audio = useRef(new Audio(src))
  audio.current.loop = loop
  const { soundsOn } = useSoundSettings()
  
  const changeTrack = (src: string) => {
    if (src === audio.current.src) {
      return
    }

    audio.current.pause()
    audio.current = new Audio(src)
    lastSrc.current = src
  }

  const play = (soundsOnExternal?: boolean) => {
    if (soundsOnExternal || soundsOn) {
      audio.current.currentTime = 0
      audio.current.loop = loop
      audio.current.play()
    }
  }

  const stop = () => {
    audio.current.pause()
  }

  return {
    src: lastSrc.current,
    stop,
    changeTrack,
    play,
  }
}

export default useSound