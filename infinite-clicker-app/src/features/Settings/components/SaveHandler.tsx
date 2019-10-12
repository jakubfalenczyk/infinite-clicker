import React, { useRef, ChangeEvent } from "react"
import { Button } from "@material-ui/core"
import { useGameState, GameStateContextType } from "../../../gameState"
import { saveAs } from "file-saver"

interface SaveHandlerProps {
  onActionCompleted: () => void
  onImportError: () => void
}

const SaveHandler = (props: SaveHandlerProps) => {
  const gameState = useGameState()
  const inputElement = useRef<HTMLInputElement>(null)

  const onExportClick = () => {
    const stateAsJson = JSON.stringify(gameState)
    const base64 = btoa(stateAsJson)
    const blob = new Blob([base64], {type: "text/plain;charset=utf-8"});
    const filename = "lumberjack-clicker.save"
    saveAs(blob, filename)
    props.onActionCompleted()
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
    catch {
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

export default SaveHandler