import React, { useState } from "react"
import "./styles.scss"
import StartNewGame from "./components/StartNewGame"
import ImportExportSave from "./components/ImportExportSave"
import Credits from "./components/Credits"
import { useSoundSettings } from "common/useSoundSettings"
import GameModal from "components/GameModal"
import Button from "components/GameModal/components/Button"

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const soundSettings = useSoundSettings()

  return (
    <>
      <div className="uiButton" onClick={onOpen}>
        Settings
        <div className="buttonIcon">
          <i className="fas fa-cog"></i>
        </div>
      </div>
      <GameModal
        title="Settings"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Button onClick={onClose}>
          Continue
        </Button>
        <StartNewGame onStartNewGame={onClose}/>
        <Button onClick={() => soundSettings.changeSoundSettings()}>
          Sounds: {soundSettings.soundsOn ? "ON" : "OFF"}
        </Button>
        <Button onClick={() => soundSettings.changeMusicSettings()}>
          Music: {soundSettings.musicOn ? "ON" : "OFF"}
        </Button>
        <ImportExportSave onActionCompleted={onClose}/>
        <Credits/>
      </GameModal>
    </>
  )
}

export default Settings