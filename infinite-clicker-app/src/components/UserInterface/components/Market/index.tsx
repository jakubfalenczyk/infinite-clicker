import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { Materials } from "gameState/player/model"
import MarketItem from "./components/MarketItem"
import { allMarketGoods } from "./allMarketGoods"

const Market = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()

  const sell = (material: keyof Materials, price: number, sold?: number) => {
    let soldMaterials = sold || player[material]
    
    if (soldMaterials > player.wood) {
      return
    }

    player.updateState({
      ...player,
      [material]: player[material] - soldMaterials,
      gold: player.gold + soldMaterials * price,
    })
  }

  const buy = (material: keyof Materials, price: number, bought: number) => {
    if (bought * price > player.gold) {
      return
    }

    player.updateState({
      ...player,
      [material]: player[material] + bought,
      gold: player.gold - bought * price,
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
        {Object.values(allMarketGoods).map(x => 
          <MarketItem
            key={x.material}
            icon={x.icon}
            material={x.material}
            price={x.price}
            sell={count => sell(x.material, x.price, count)}
            buy={count => buy(x.material, x.price, count)}
          />
        )}
      </GameModal>
    </>
  )
}

export default Market