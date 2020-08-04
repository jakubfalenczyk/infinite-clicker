import React, { useState, useEffect } from "react"
import "./styles.scss"
import StartNewGame from "./components/StartNewGame"
import ImportExportSave from "./components/ImportExportSave"
import Credits from "./components/Credits"
import { useSoundSettings } from "common/useSoundSettings"
import GameModal from "components/GameModal"
import Button from "components/GameModal/components/Button"
import UIButton from "../UIButton"
import useMusic from "gameState/music/useMusic"
import { useGameState } from "gameState"
import { useMediaQuery } from "beautiful-react-hooks"

const Settings = () => {
  const { player } = useGameState()
  const [isOpen, setIsOpen] = useState(true)
  const onOpen = () => setIsOpen(true)
  
  const onClose = () => {
    setIsOpen(false)
    
    if (currentMusic.current && soundSettings.soundsOn && currentMusic.current.currentTime === 0) {
      currentMusic.current.currentTime = 0
      currentMusic.current.play()
    }
  }
  
  const soundSettings = useSoundSettings()
  const { currentMusic } = useMusic()
  
  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (!currentMusic.current) {
      return
    }

    if (!soundSettings.soundsOn) {
      currentMusic.current.pause()
    } else {
      currentMusic.current.currentTime = 0
      currentMusic.current.play()
    }
  }, [soundSettings, currentMusic])

  const onStartNewGame = () => {
    onClose()
  }

  const onContinue = () => {
    onClose()
  }

  const onSoundSettingsChange = () => {
    soundSettings.changeSoundSettings()
  }

  return (
    <>
      <UIButton 
        className="settingsButton"
        label={isLargeScreen ? "Settings" : ""}
        onClick={onOpen}
        icon={<i className="fas fa-cog"></i>}
      />
      <GameModal
        className="settingsModal"
        title="Settings"
        isOpen={isOpen}
        onClose={onClose}
        noExternalClosing={player.isNewPlayer}
        hideExit={player.isNewPlayer}
      >
        {!player.isNewPlayer && (
          <Button onClick={onContinue}>
            Continue
          </Button>
        )}
        <StartNewGame 
          ignoreConfirmation={player.isNewPlayer}
          onStartNewGame={onStartNewGame}
        />
        <Button onClick={onSoundSettingsChange}>
          Sounds: {soundSettings.soundsOn ? "ON" : "OFF"}
        </Button>
        <ImportExportSave onActionCompleted={onClose}/>
        <Credits/>
      </GameModal>
    </>
  )
}

export default Settings