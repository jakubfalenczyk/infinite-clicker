import React, { useState } from "react"
import "./styles.scss"
import StartNewGame from "./components/StartNewGame"
import ImportExportSave from "./components/ImportExportSave"
import Credits from "./components/Credits"
import { useSoundSettings } from "common/useSoundSettings"
import GameModal from "components/GameModal"
import Button from "components/GameModal/components/Button"
import UIButton from "../UIButton"
import useMusic from "gameState/music/useMusic"
import { music } from "sounds"

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const soundSettings = useSoundSettings()
  const bgMusic = useMusic()

  const onStartNewGame = () => {
    onClose()
    bgMusic.changeTrack(music.bg)
    bgMusic.play()
  }

  const onContinue = () => {
    onClose()
    bgMusic.changeTrack(music.bg)
    bgMusic.play()
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
        <Button onClick={() => soundSettings.changeSoundSettings()}>
          Sounds: {soundSettings.soundsOn ? "ON" : "OFF"}
        </Button>
        <ImportExportSave onActionCompleted={onClose}/>
        <Credits/>
      </GameModal>
    </>
  )
}

export default Settings