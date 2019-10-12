import React, { PropsWithChildren, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogActions } from '@material-ui/core'
import { useSoundSettings } from '../useSoundSettings'
import SaveHandler from './SaveHandler'
import { useGameState } from '../../../gameState'

const SettingsModal = (props: PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false)
  const [hasImportError, setHasImportError] = useState(false)
  const [isCreditsOpen, setIsCreditsOpen] = useState(false)
  const [isNewGameConfirmationOpen, setIsNewGameConfirmationOpen] = useState(false)
  const soundSettings = useSoundSettings()
  const gameState = useGameState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const showImportError = () => {
    setHasImportError(true)
  }

  const hideImportError = () => {
    setHasImportError(false)
  }

  const onStartNewGame = () => {
    gameState.reset()
    setIsNewGameConfirmationOpen(false)
    setOpen(false)
  }

  const openCredits = () => {
    setIsCreditsOpen(true)
  }

  const closeCredits = () => {
    setIsCreditsOpen(false)
  }

  const openNewGameConfirmation = () => {
    setIsNewGameConfirmationOpen(true)
  }

  const closeNewGameConfirmation = () => {
    setIsNewGameConfirmationOpen(false)
  }

  return (
    <div className="settingsContainer">
      <div className="settingsOpen" onClick={handleOpen}>
        {props.children}
      </div>
      <Dialog className="settingsDialog" onClose={handleClose} open={open}>
        <DialogTitle disableTypography>
          <div className="title">Settings</div>
        </DialogTitle>
        <DialogContent>
          <Button onClick={handleClose}>
            Continue
          </Button>
          <Button onClick={openNewGameConfirmation}>
            Start New Game
          </Button>
          <Button onClick={() => soundSettings.changeSoundSettings()}>
            Sounds: {soundSettings.soundsOn ? "ON" : "OFF"}
          </Button>
          <Button onClick={() => soundSettings.changeMusicSettings()}>
            Music: {soundSettings.musicOn ? "ON" : "OFF"}
          </Button>
          <SaveHandler
            onActionCompleted={handleClose}
            onImportError={showImportError}
          />
          <Button onClick={openCredits}>
            Credits
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog className="smallDialog" open={hasImportError} onClose={hideImportError}>
        <DialogTitle disableTypography>
          <div className="title">Invalid save file</div>
        </DialogTitle>
        <DialogContent>
            The file you've selected is not compatible.<br/><br/>
            Make sure you've selected a valid save file from the game.<br/>
        </DialogContent>
        <div className="actions">
          <Button onClick={hideImportError}>
            Ok
          </Button>
        </div>
      </Dialog>
      <Dialog className="smallDialog" open={isNewGameConfirmationOpen} onClose={closeNewGameConfirmation}>
        <DialogTitle disableTypography>
          <div className="title">Are you sure ?</div>
        </DialogTitle>
        <DialogContent>
            Starting a new game will reset all of your progress.<br/>
        </DialogContent>
        <div className="actions">
          <Button onClick={onStartNewGame}>
            Yes
          </Button>
          <Button onClick={closeNewGameConfirmation}>
            Cancel
          </Button>
        </div>
      </Dialog>
      <Dialog className="smallDialog" open={isCreditsOpen} onClose={closeCredits}>
        <DialogTitle disableTypography>
          <div className="title">Credits</div>
        </DialogTitle>
        <DialogContent>
            This game has been created by Jakub Falenczyk<br/>
            You can find me on LinkedIn:<br/>
            <a className="creditsLink" href="https://linkedin.com/in/jakubfalenczyk" target="_blank" rel="noopener noreferrer">
              https://linkedin.com/in/jakubfalenczyk
            </a>
            <br/>
            <br/>
            I'm using assets from: 
              <a className="creditsLink" href="https://kenney.nl" target="_blank" rel="noopener noreferrer">
                https://kenney.nl
              </a>
            <br/>
            and music from: 
              <a className="creditsLink" href="https://zapsplat.com/" target="_blank" rel="noopener noreferrer">
                https://zapsplat.com/
              </a>
            <br/>
        </DialogContent>
        <div className="actions">
          <Button onClick={closeCredits}>
            Ok
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
export default SettingsModal