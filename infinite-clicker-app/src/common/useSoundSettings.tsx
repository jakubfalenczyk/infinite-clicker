import React, { useContext, createContext } from "react"
import { useStateWithLocalStorage } from "./useStateWithLocalStorage"
import _ from "lodash"

interface SoundSettings {
  soundsOn: boolean
  changeSoundSettings: () => void
}

const defaultSoundSettings: SoundSettings = {
  soundsOn: true,
  changeSoundSettings: _.noop,
}

const SoundSettingsContext = createContext(defaultSoundSettings)

const SoundSettingsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { state, setState } = useStateWithLocalStorage(defaultSoundSettings, "soundSettings")

  const changeSoundSettings = () => {
    setState({ 
      ...state, 
      soundsOn: !state.soundsOn
    })
  }

  const soundSettings = {
    ...state,
    changeSoundSettings,
  }
 
  return (
    <SoundSettingsContext.Provider value={soundSettings}>
      {children}
    </SoundSettingsContext.Provider>
  )
}

const useSoundSettings = () => {
  return useContext(SoundSettingsContext)
}

export {
  SoundSettingsProvider,
  useSoundSettings,
}