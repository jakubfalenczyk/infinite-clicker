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

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const soundSettings = useSoundSettings()
  const { currentMusic } = useMusic()

  useEffect(() => {
    if (!soundSettings.soundsOn) {
      currentMusic.current.stop()
    } else {
      currentMusic.current.play(soundSettings.soundsOn)
    }
  }, [soundSettings, currentMusic])

  const onStartNewGame = () => {
    onClose()
    currentMusic.current.play()
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
        label="Settings"
        onClick={onOpen}
        icon={<i className="fas fa-cog"></i>}
      />
      <GameModal
        title="Lumber Click"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Button onClick={onContinue}>
          Continue
        </Button>
        <StartNewGame onStartNewGame={onStartNewGame}/>
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