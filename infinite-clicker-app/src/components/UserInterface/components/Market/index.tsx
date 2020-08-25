import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { Materials } from "gameState/player/model"
import MarketItem from "./components/MarketItem"
import { allMarketGoods } from "./allMarketGoods"
import useSound from "common/useSound"
import UIButton from "../UIButton"
import { useMediaQuery } from "beautiful-react-hooks"
import ReactGA from "react-ga"

const Market = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player } = useGameState()
  const disabledClickSound = useSound("sounds-disabled-click")
  const moneySound = useSound("sounds-money")
  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  const sell = (material: keyof Materials, price: number, sold?: number) => {
    const currentPrice = price * (player.marketPriceMultiplier || 1)
    let soldMaterials = sold || player[material]
    
    if (soldMaterials > player[material] || player[material] === 0) {
      disabledClickSound.play()
      return
    }

    moneySound.play()

    player.updateState({
      ...player,
      [material]: player[material] - soldMaterials,
      gold: player.gold + soldMaterials * currentPrice,
      goldEarnedFromStart: player.goldEarnedFromStart + soldMaterials * currentPrice
    })

    ReactGA.event({
      category: "Market",
      action: "Sold items on market",
      label: material,
      value: soldMaterials,
    })
  }

  const buy = (material: keyof Materials, price: number, bought: number) => {
    if (bought * price > player.gold) {
      disabledClickSound.play()
      return
    }

    player.updateState({
      ...player,
      [material]: player[material] + bought,
      gold: player.gold - bought * price,
    })

    moneySound.play()
  }

  return (
    <>
      <UIButton 
        label="Market"
        onClick={onOpen}
        icon={<i className="fas fa-shopping-cart"></i>}
      />
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
              {isLargeScreen ? "Action" : "Sell"}
          </div>
        </div>
        {Object.values(allMarketGoods).map(x => 
          <MarketItem
            key={x.material}
            icon={x.icon}
            material={x.material}
            price={x.price * (player.marketPriceMultiplier || 1)}
            sell={count => sell(x.material, x.price, count)}
            buy={count => buy(x.material, x.price, count)}
          />
        )}
      </GameModal>
    </>
  )
}

export default Market