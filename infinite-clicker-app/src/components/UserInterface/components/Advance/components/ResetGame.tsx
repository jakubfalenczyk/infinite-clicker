import React, { useState } from "react"
import Button from "components/GameModal/components/Button"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { multiplierStep, gameResetBasePrice, gameResetPriceMultiplier } from ".."
import { uiSounds } from "sounds"
import useSound from "common/useSound"
import { defaultPlayerState } from "gameState/player/model"

interface ResetGameProps {
  onConfirm: () => void
}

const ResetGame = (props: ResetGameProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const onConfirmationOpen = () => setIsConfirmationOpen(true)
  const onClose = () => setIsConfirmationOpen(false)
  
  const disabledClickSound = useSound(uiSounds.disabledClick)
  const moneySound = useSound(uiSounds.money)

  const gameState = useGameState()
  const { player } = gameState
  const currentMultiplier = player.marketPriceMultiplier || 1
  const nextMultiplier = currentMultiplier + multiplierStep
  const currentResetPrice = player.gameResetPrice || gameResetBasePrice
  const canReset = player.gold >= currentResetPrice

  const onAdvanceClick = () => {
    if (!canReset) {
      disabledClickSound.play()
    } else {
      onConfirmationOpen()
    }
  }

  const onConfirm = () => {
    moneySound.play()
    const achievementsState = { ...gameState.achievements }
    const playerState = { ...gameState.player }
    gameState.reset()
    gameState.achievements.updateState(achievementsState)
    player.updateState({
      ...defaultPlayerState,
      isNewPlayer: false,
      gold: playerState.gold - currentResetPrice,
      marketPriceMultiplier: nextMultiplier,
      gameReset: playerState.gameReset + 1,
      gameResetPrice: currentResetPrice * gameResetPriceMultiplier,
    })
    onClose()
    props.onConfirm()
  }

  return (
    <>
      <Button disabledTooltip={canReset ? undefined : "Not enough gold!"} onClick={onAdvanceClick}>
        Reset and advance
      </Button>
      <GameModal
        title="Are you sure ?"
        isOpen={isConfirmationOpen}
        onClose={onClose}
        isNested={true}
        actions={
          <>
            <Button onClick={() => onConfirm()}>
              Yes
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </>
        }
      >
        All your upgrades and resources will be reset.<br/>
        Your market prices multiplier will be set to: {nextMultiplier}
      </GameModal>
    </>
  )
}

export default ResetGame