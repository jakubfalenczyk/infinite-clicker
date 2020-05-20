import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { calculateGatheredMaterials } from "../Upgrades/calculateGatheredMaterials"
import { allMarketGoods } from "../Market/allMarketGoods"
import { Materials } from "gameState/player/model"
import { allUpgrades } from "gameState/upgrades/allUpgrades"
import { formatNumber } from "common/formatNumber"

const PlayerStats = () => {
  const { player, upgrades } = useGameState()
  
  const hasAnyUpgradeForMaterial = (material: keyof Materials) => {
    if (material === "wood" || player[material] > 0) {
      return true
    }

    const materialUpgrades = Object.values(allUpgrades).filter(x => x.gatheredMaterial === material)
    return materialUpgrades.some(x => upgrades[x.key].count > 0)
  }
  
  const stateAfterGathering = calculateGatheredMaterials(upgrades, player)

  return (
    <div className="playerStats">
      <div className="resources">
        <div className="gold stat">
          <i className="fas fa-coins"></i> Gold: {formatNumber(player.gold)}
        </div>
        {Object.values(allMarketGoods).map(x => 
          hasAnyUpgradeForMaterial(x.material) && (
            <div className="stat" key={x.material}>
              {x.icon} {x.label}: {formatNumber(player[x.material])} ({formatNumber(stateAfterGathering[x.material] - player[x.material]) || 0}/s)
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PlayerStats