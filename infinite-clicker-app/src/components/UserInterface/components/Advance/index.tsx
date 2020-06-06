import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import UIButton from "../UIButton"
import ResetGame from "./components/ResetGame"
import { formatNumberWithSuffix } from "common/formatNumber"

export const multiplierStep = 0.5
export const gameResetBasePrice = 100000000
export const gameResetPriceMultiplier = 10

const Advance = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()
  const currentMultiplier = player.marketPriceMultiplier || 1
  const currentResetPrice = player.gameResetPrice || gameResetBasePrice

  return (
    <>
      <UIButton 
        label="Advance"
        onClick={onOpen}
        icon={<i className="fas fa-redo"></i>}
      />
      <GameModal
        className="advanceModal"
        title="Advance"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="disclaimer">
          When you advance, your game progress will be reset but at the same time market prices will be multiplied.
        </div>
        <div className="resetCount">
          Current game reset count: <span className="value">{player.gameReset}</span>
        </div>
        <div className="multiplier">
          Current market prices multiplier: <span className="value">{currentMultiplier}</span>      
        </div>
        <div className="multiplier">
          Next multiplier: <span className="value">{currentMultiplier + multiplierStep}</span>
        </div>
        <div className="multiplier">
          Gold required to advance: <span className="value">{formatNumberWithSuffix(currentResetPrice)}</span>
        </div>
        <div className="actions">
          <ResetGame onConfirm={onClose}/>
        </div>
      </GameModal>
    </>
  )
}

export default Advance