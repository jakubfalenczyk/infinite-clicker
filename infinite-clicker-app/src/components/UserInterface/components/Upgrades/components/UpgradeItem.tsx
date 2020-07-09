import React from "react"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"
import { UpgradeParams, allUpgrades } from "gameState/upgrades/allUpgrades"
import { formatNumber } from "common/formatNumber"
import { allMarketGoods } from "../../Market/allMarketGoods"

interface UpgradeItemProps {
  item: UpgradeParams
  buy: () => void
}

const UpgradeItem = (props: UpgradeItemProps) => {
  const { upgrades } = useGameState()
  const { item, buy } = props
  const upgradeProps = allUpgrades[item.key]
  const upgrade = upgrades[item.key]
  const usedLabel = formatNumber(upgradeProps.usedPerSec || 0) + " "
    + allMarketGoods[upgradeProps.usedMaterial || "wood"].label.toLowerCase()
  const gatheredLabel = upgradeProps.gatheredPerSec + " "
    + allMarketGoods[upgradeProps.gatheredMaterial].label.toLowerCase()

  return (
    <div className="upgradesRow">
      <div className="upgradeCell">
        <div className="label">
          {item.icon} {item.label}
          {upgradeProps.usedPerSec ? 
            <div className="description">Uses {usedLabel} to produce {gatheredLabel}</div>
            : <div className="description">Produces {gatheredLabel}</div>
          }
        </div>
      </div>
      <div className="priceCell">
        <span className="label">
          <i className="fas fa-coins"></i>
          {formatNumber(upgrade.price)}
        </span>
      </div>
      <div className="countCell">
        <div className="label">
          {formatNumber(upgrade.count)}
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