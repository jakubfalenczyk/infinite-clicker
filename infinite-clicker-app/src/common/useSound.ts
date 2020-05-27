import { useRef, useEffect } from "react"
import { useSoundSettings } from "./useSoundSettings"

export interface AudioControls {
  changeTrack: (src: string) => void
  changeTrackAndPlay: (src: string, soundsOnExternal?: boolean) => void
  play: (soundsOnExternal?: boolean) => void
}

const useSound = (src: string, loop: boolean = false): AudioControls => {
  const lastSrc = useRef(src)
  const audio = useRef(new Audio(src))
  audio.current.loop = loop
  const { soundsOn } = useSoundSettings()
  
  const changeTrackAndPlay = (src: string, soundsOnExternal?: boolean) => {
    if (src === lastSrc.current) {
      return
    }
    
    changeTrack(src)
    play(soundsOnExternal)
  }

  const changeTrack = (src: string) => {
    if (src === audio.current.src) {
      return
    }

    audio.current.pause()
    audio.current.src = src
    audio.current.loop = loop
    lastSrc.current = src
  }

  const play = (soundsOnExternal?: boolean, continuePlaying?: boolean) => {
    const isPlaying = !audio.current.paused || audio.current.currentTime

    if (isPlaying && continuePlaying) {
      return
    }

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
    changeTrackAndPlay,
    changeTrack,
    play,
  }
}

export default useSound