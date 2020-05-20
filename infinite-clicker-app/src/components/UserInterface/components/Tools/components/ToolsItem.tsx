import React from "react"
import { Axe, AxeTypes } from "../allAxes"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"
import { formatNumber } from "common/formatNumber"

interface ToolsItemProps {
  item: Axe
  buy: (key: keyof AxeTypes) => void
}

const ToolsItem = (props: ToolsItemProps) => {
  const { player, tree } = useGameState()
  const { item, buy } = props

  return (
    <div className="row">
      <div className="toolsCell">
        <div>
          {item.label}
          <div className="description">[Cuts tree in {Math.ceil(tree.maxLife / item.damage)} hits]</div>
        </div>
        <img src={item.imgUrl} alt={item.label}/>
      </div>
      <div className="priceCell">
        {formatNumber(item.price)} <i className="fas fa-coins"></i> 
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