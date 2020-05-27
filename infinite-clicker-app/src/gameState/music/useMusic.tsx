import React, { useRef } from "react"
import useSound, { AudioControls } from "common/useSound"
import { music } from "sounds"
import { MusicState, defaultMusicState, MusicType } from "./model"
import { useContext, createContext } from "react"

export type MusicContextType = MusicState

export const defaultMusicContext: MusicContextType = {
  ...defaultMusicState,
}

const MusicContext = createContext(defaultMusicContext)

export const MusicProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const bgMusic = useSound(music.bg, true)
  const wildfire = useSound(music.danger, true)
  const termites = useSound(music.danger2, true)
  const currentMusic = useRef(bgMusic)

  const changeMusic = (type: MusicType, soundsOn: boolean) => {
    switch (type) {
      case "bg":
        change(bgMusic, soundsOn)
        break;
      case "wildfire":
        change(wildfire, soundsOn)
        break;
      case "termites":
        change(termites, soundsOn)
        break;
      default:
        break;
    }
  }

  const change = (music: AudioControls, soundsOn: boolean) => {
    if (music.src === currentMusic.current.src) {
      return
    }

    currentMusic.current.stop()
    currentMusic.current = music

    if (soundsOn) {
      currentMusic.current.play()
    }
  }

  const state: MusicState = {
    currentMusic,
    changeMusic,
  }

  return (
    <MusicContext.Provider value={state}>
      {children}
    </MusicContext.Provider>
  )
}

const useMusic = () => {
  return useContext(MusicContext)
}

export default useMusic