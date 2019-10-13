import { useState, useEffect } from "react"
import { useSoundSettings } from "./useSoundSettings"

const useMusic = (src: string) => {
  const [audio] = useState(new Audio(src))
  const { musicOn } = useSoundSettings()
  
  useEffect(() => {
    if (musicOn) {
      audio.currentTime = 0
      audio.loop = true
      audio.play()
    } else {
      audio.pause()
    }
  }, [audio, musicOn])
}

export default useMusic