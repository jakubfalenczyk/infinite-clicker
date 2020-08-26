import React, { useRef, useEffect } from "react"
import { MusicState, defaultMusicState, MusicType } from "./model"
import { useContext, createContext } from "react"

export type MusicContextType = MusicState

export const defaultMusicContext: MusicContextType = {
  ...defaultMusicState,
}

const MusicContext = createContext(defaultMusicContext)

export const MusicProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const getBgMusic = () => document.getElementById("sounds-bg") as (HTMLAudioElement | null)
  const getWildfire = () => document.getElementById("sounds-danger") as (HTMLAudioElement | null)
  const getTermites = () => document.getElementById("sounds-danger2") as (HTMLAudioElement | null)
  
  const currentMusic = useRef<HTMLAudioElement | null>(getBgMusic())

  useEffect(() => {
    currentMusic.current = getBgMusic()
  })

  const changeMusic = (type: MusicType, soundsOn: boolean) => {
    switch (type) {
      case "bg":
        change(getBgMusic(), soundsOn)
        break;
      case "wildfire":
        change(getWildfire(), soundsOn)
        break;
      case "termites":
        change(getTermites(), soundsOn)
        break;
      default:
        break;
    }
  }

  const change = (music: HTMLAudioElement | null, soundsOn: boolean) => {
    if (!music) {
      return
    }

    if (currentMusic.current && music.id === currentMusic.current.id) {
      return
    }

    if (currentMusic.current) {
      currentMusic.current.pause()
    }

    currentMusic.current = music
    currentMusic.current.currentTime = 0

    if (soundsOn) {
      currentMusic.current.play()
    }
  }

  const stopAll = () => {
    const allSounds = [ getBgMusic(), getWildfire(), getTermites() ]
    allSounds.forEach(s => s?.pause())
  }

  const state: MusicState = {
    currentMusic,
    changeMusic,
    stopAll,
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