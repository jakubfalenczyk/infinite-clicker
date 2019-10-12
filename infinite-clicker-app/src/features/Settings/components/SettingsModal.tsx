import React, { PropsWithChildren, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogActions } from '@material-ui/core'
import { useSoundSettings } from '../useSoundSettings'
import SaveHandler from './SaveHandler'

const SettingsModal = (props: PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false)
  const [hasImportError, setHasImportError] = useState(false)
  const soundSettings = useSoundSettings()

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
          <Button onClick={handleClose}>
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
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog className="importErrorDialog" open={hasImportError} onClose={hideImportError}>
        <DialogTitle disableTypography>
          <div className="title">Invalid save file</div>
        </DialogTitle>
        <DialogContent>
            The file you've selected is not compatible.<br/><br/>
            Make sure you've selected a valid save file from the game.<br/>
        </DialogContent>
        <div className="importErrorActions">
          <Button onClick={hideImportError}>
            Ok
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
export default SettingsModal