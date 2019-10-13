import React, { useState } from "react"
import GameModal from "../../GameModal"
import Button from "../../GameModal/components/Button"
import { useGameState } from "../../../gameState"

interface StartNewGameProps {
  onStartNewGame: () => void
}

const StartNewGame = (props: StartNewGameProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const onConfirmationOpen = () => setIsConfirmationOpen(true)
  const onClose = () => setIsConfirmationOpen(false)
  const gameState = useGameState()

  const onConfirm = () => {
    gameState.reset()
    onClose()
    props.onStartNewGame()
  }

  return (
    <>
      <Button onClick={onConfirmationOpen}>
        Start New Game
      </Button>
      <GameModal
        title="Are you sure ?"
        isOpen={isConfirmationOpen}
        onClose={onClose}
        isNested={true}
        actions={
          <>
            <Button onClick={onConfirm}>
              Yes
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </>
        }
      >
        Starting a new game will reset your progress.<br/>
      </GameModal>
    </>
  )
}

export default StartNewGame