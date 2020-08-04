import { useRef, useEffect } from "react"
import { useSoundSettings } from "./useSoundSettings"

export interface AudioControls {
  id: string
  play: (soundsOnExternal?: boolean) => void
  stop: () => void
}

const useSound = (id: string): AudioControls => {
  const getSound = () => document.getElementById(id) as (HTMLAudioElement | null)
  const audio = useRef<HTMLAudioElement | null>(getSound())
  
  useEffect(() => {
    audio.current = getSound()
  })
  
  const { soundsOn } = useSoundSettings()
  
  const play = (soundsOnExternal?: boolean) => {
    if (audio.current && (soundsOnExternal || soundsOn)) {
      audio.current.currentTime = 0
      audio.current.play()
    }
  }

  const stop = () => {
    if (audio.current) {
      audio.current.pause()
    }
  }

  return {
    id,
    play,
    stop,
  }
}

export default useSound