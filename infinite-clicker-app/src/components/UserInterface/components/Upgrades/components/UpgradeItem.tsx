import React from "react"
import { Upgrade } from "common/upgrades"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"

interface UpgradeItemProps {
  item: Upgrade
  buy: () => void
}

const UpgradeItem = (props: UpgradeItemProps) => {
  const { upgrades } = useGameState()
  const { item, buy } = props
  
  return (
    <div key={item.storeKey} className="upgradesRow">
      <div className="upgradeCell">
        <div className="label">
          {item.icon} {item.label}
        </div>
      </div>
      <div className="priceCell">
        <div className="label">
          {item.price} <i className="fas fa-coins"></i> 
        </div>
      </div>
      <div className="countCell">
        <div className="label">
          {upgrades[item.storeKey]}
        </div>
      </div>
      <div className="actionCell">
        <Button onClick={() => buy()}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>
    </div>  
  )
}

export default UpgradeItem