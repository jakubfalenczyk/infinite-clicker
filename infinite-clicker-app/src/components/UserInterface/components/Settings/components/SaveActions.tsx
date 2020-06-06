import React, { useRef, ChangeEvent } from "react"
import { saveAs } from "file-saver"
import { useGameState, GameStateContextType } from "gameState"
import Button from "components/GameModal/components/Button"

const saveFileName = "lumber-click.sav"

interface SaveActionsProps {
  onActionCompleted: () => void
  onImportError: () => void
}

const SaveActions = (props: SaveActionsProps) => {
  const gameState = useGameState()
  const inputElement = useRef<HTMLInputElement>(null)

  const onExportClick = () => {
    const stateAsJson = JSON.stringify(gameState)
    const base64 = btoa(stateAsJson)
    const blob = new Blob([base64], {type: "text/plain;charset=utf-8"});
    saveAs(blob, saveFileName)

    if (!gameState.player.isNewPlayer) {
      props.onActionCompleted()
    }
  }

  const onImportClick = () => {
    if (inputElement.current) {
      inputElement.current.click()
    }
  }

  const handleSaveImport = (result: string) => {
    try {
      const json = atob(result)
      const savedState: GameStateContextType = JSON.parse(json)
      gameState.importSavedState(savedState)
      props.onActionCompleted()
    }
    catch (e) {
      props.onImportError()
    }
  }

  const onInputChange = (event: ChangeEvent) => {
    if (inputElement.current 
      && inputElement.current.files 
      && inputElement.current.files.length > 0
    ) {
      var reader = new FileReader()
      reader.onload = () => handleSaveImport(reader.result as string)
      reader.readAsText(inputElement.current.files[0])
    }
  }
  
  return (
    <>
      <Button onClick={onExportClick}>
        Export save file
      </Button>
      <Button onClick={onImportClick}>
        Import save file
      </Button>
      <input ref={inputElement} onChange={onInputChange} type="file" style={{ display: "none" }} />
    </>
  ) 
}

export default SaveActions