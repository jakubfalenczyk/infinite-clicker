import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { Materials } from "gameState/player/model"
import { marketPrices } from "common/marketPrices"
import MarketItem from "./components/MarketItem"

const Market = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()

  const sell = (material: keyof Materials, sold?: number) => {
    let soldMaterials = sold || player[material]
    
    if (soldMaterials > player.wood) {
      return
    }

    player.updateState({
      ...player,
      [material]: player[material] - soldMaterials,
      gold: player.gold + soldMaterials * marketPrices[material],
    })
  }

  const buy = (material: keyof Materials, bought: number) => {
    if (bought * marketPrices[material] > player.gold) {
      return
    }

    player.updateState({
      ...player,
      [material]: player[material] + bought,
      gold: player.gold - bought * marketPrices[material],
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
        <div className="header">
          <div className="materialCell">
              Material
          </div>
          <div className="priceCell">
              Price
          </div>
          <div className="actionsCell">
              Action
          </div>
        </div>
        <MarketItem
          icon={<i className="fas fa-tree"></i>}
          material="wood"
          sell={count => sell("wood", count)}
          buy={count => buy("wood", count)}
        />
      </GameModal>
    </>
  )
}

export default Market