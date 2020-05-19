import React from "react"
import { Materials } from "gameState/player/model"

export interface Goods {
  price: number
  icon: JSX.Element
  material: keyof Materials
  label: string
}

export const allMarketGoods: Record<keyof Materials, Goods> = {
  wood: {
    price: 10,
    icon: <i className="fas fa-tree"></i>,
    material: "wood",
    label: "Wood",
  },
  charcoal: {
    price: 80,
    icon: <i className="fas fa-fire"></i>,
    material: "charcoal",
    label: "Charcoal",
  },
  plank: {
    price: 50,
    icon: <i className="fas fa-grip-lines-vertical"></i>,
    material: "plank",
    label: "Planks",
  }
}