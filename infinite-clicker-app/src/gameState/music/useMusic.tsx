import React from "react"
import useSound from "common/useSound"
import { music } from "sounds"
import { MusicState, defaultMusicState } from "./model"
import { useContext, createContext } from "react"

export type MusicContextType = MusicState

export const defaultMusicContext: MusicContextType = {
  ...defaultMusicState,
}

const MusicContext = createContext(defaultMusicContext)

export const MusicProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const bgMusic = useSound(music.bg, true)

  return (
    <MusicContext.Provider value={ bgMusic }>
      {children}
    </MusicContext.Provider>
  )
}

const useMusic = () => {
  return useContext(MusicContext)
}

export default useMusic