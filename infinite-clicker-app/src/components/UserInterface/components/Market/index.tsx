import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import Button from "components/GameModal/components/Button"

const woodPrice = 10

const Market = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()

  const sellWood = (sold: number) => {
    if (sold > player.wood)
      return

    player.updateState({
      ...player,
      wood: player.wood - sold,
      gold: player.gold + sold * woodPrice,
    })
  }

  const buyWood = (bought: number) => {
    if (bought * woodPrice > player.gold)
      return

    player.updateState({
      ...player,
      wood: player.wood + bought,
      gold: player.gold - bought * woodPrice,
    })
  }

  return (
    <>
      <div className="uiButton" onClick={onOpen}>
        Market
        <div className="buttonIcon">
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
      <GameModal
        className="marketModal"
        title="Market"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="marketRow">
          <div className="marketCell">
            <div className="label">
              <i className="fas fa-tree"></i> Wood
            </div>
          </div>
          <div className="marketCell">
            <div className="label">
            {woodPrice} <i className="fas fa-coins"></i> 
            </div>
          </div>
          <div className="marketCell">
            <div className="label">Sell</div>
            <Button onClick={() => sellWood(10)}>
              10x
            </Button>
            <Button onClick={() => sellWood(100)}>
              100x
            </Button>
          </div>
          <div className="marketCell">
            <div className="label">Buy</div>
            <Button onClick={() => buyWood(10)}>
              10x
            </Button>
            <Button onClick={() => buyWood(100)}>
              100x
          </Button>
          </div>
        </div>
      </GameModal>
    </>
  )
}

export default Market