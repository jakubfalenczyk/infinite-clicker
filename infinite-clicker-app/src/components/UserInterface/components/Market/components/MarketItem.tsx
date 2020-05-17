import React from "react"
import { Materials } from "gameState/player/model"
import Sell from "./Sell"
import Buy from "./Buy"

interface MarketItemProps {
  icon: JSX.Element
  material: keyof Materials
  price: number
  sell: (count?: number) => void
  buy: (count: number) => void
}

const MarketItem = (props: MarketItemProps) => {
  const { icon, material, price, sell, buy } = props

  return (
    <div className="marketRow">
      <div className="materialCell">
        <div className="label">
          {icon}<span className="materialName">{material}</span>
        </div>
      </div>
      <div className="priceCell">
        <div className="label">
        {price} <i className="fas fa-coins"></i> 
        </div>
      </div>
      <div className="actionsCell">
        <div>
          <Sell action={count => sell(count)}/>
          <Buy action={count => buy(count)}/>
        </div>
      </div>
    </div>
  )
}

export default MarketItem