import React from "react"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"
import { UpgradeParams } from "gameState/upgrades/allUpgrades"
import { formatNumber } from "common/formatNumber"

interface UpgradeItemProps {
  item: UpgradeParams
  buy: () => void
}

const UpgradeItem = (props: UpgradeItemProps) => {
  const { upgrades } = useGameState()
  const { item, buy } = props
  
  return (
    <div className="upgradesRow">
      <div className="upgradeCell">
        <div className="label">
          {item.icon} {item.label}
        </div>
      </div>
      <div className="priceCell">
        <div className="label">
          {formatNumber(upgrades[item.key].price)} <i className="fas fa-coins"></i> 
        </div>
      </div>
      <div className="countCell">
        <div className="label">
          {formatNumber(upgrades[item.key].count)}
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