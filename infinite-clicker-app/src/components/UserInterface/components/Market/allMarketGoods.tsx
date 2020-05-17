import React from "react"
import { Materials } from "gameState/player/model"

export interface Goods {
  price: number
  icon: JSX.Element
  material: keyof Materials
}

export const allMarketGoods: Goods[] = [
  {
    price: 10,
    icon: <i className="fas fa-tree"></i>,
    material: "wood",
  },
]