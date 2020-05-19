import React from "react"
import { Axe, AxeTypes } from "../allAxes"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"

interface ToolsItemProps {
  item: Axe
  buy: (key: keyof AxeTypes) => void
}

const ToolsItem = (props: ToolsItemProps) => {
  const { player } = useGameState()
  const { item, buy } = props

  return (
    <div className="row">
      <div className="toolsCell">
        {item.label}
        <img src={item.imgUrl} alt={item.label}/>
      </div>
      <div className="priceCell">
        {item.price || "~"} <i className="fas fa-coins"></i> 
      </div>
      <div className="actionsCell">
        {player.axe.key === item.key || player.axe.price > item.price
          ? "Owned"
          : (
            <Button onClick={() => buy(item.key)}>
              <i className="fas fa-shopping-basket"></i>
            </Button>
          )
        }
        
      </div>
    </div>
  )
}

export default ToolsItem