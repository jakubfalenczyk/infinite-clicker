import React, { useState } from "react"
import SaveActions from "./SaveActions"
import Button from "components/GameModal/components/Button"
import GameModal from "components/GameModal"

interface ImportExportSaveProps {
  onActionCompleted: () => void
}

const ImportExportSave = (props: ImportExportSaveProps) => {
  const [isInvalid, setIsInvalid] = useState(false)
  const onImportError = () => setIsInvalid(true)
  const onClose = () => setIsInvalid(false)

  return (
    <>
      <SaveActions
        onActionCompleted={props.onActionCompleted}
        onImportError={onImportError}
      />
      <GameModal
        title="Invalid save file"
        isOpen={isInvalid}
        isNested={true}
        onClose={onClose}
        actions={<Button onClick={onClose}>Ok</Button>}
      >
        The file you've selected is not compatible.<br/><br/>
        Make sure you've selected a valid save file from the game.<br/>
      </GameModal>
    </>
  )
}

export default ImportExportSave