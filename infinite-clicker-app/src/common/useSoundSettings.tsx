import React, { useContext, createContext } from "react"
import { useStateWithLocalStorage } from "./useStateWithLocalStorage"
import _ from "lodash"

interface SoundSettings {
  soundsOn: boolean
  musicOn: boolean
  changeSoundSettings: () => void
  changeMusicSettings: () => void
}

const defaultSoundSettings: SoundSettings = {
  soundsOn: true,
  musicOn: false,
  changeSoundSettings: _.noop,
  changeMusicSettings: _.noop
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

  const changeMusicSettings = () => {
    setState({ 
      ...state, 
      musicOn: !state.musicOn
    })
  }

  const soundSettings = {
    ...state,
    changeSoundSettings,
    changeMusicSettings,
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