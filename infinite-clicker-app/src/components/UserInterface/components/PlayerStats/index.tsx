import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { calculateGatheredMaterials } from "../Upgrades/calculateGatheredMaterials"
import { allMarketGoods, Goods } from "../Market/allMarketGoods"
import { Materials } from "gameState/player/model"
import { allUpgrades } from "gameState/upgrades/allUpgrades"
import { formatNumber } from "common/formatNumber"

const PlayerStats = () => {
  const { player, upgrades, randomEvents } = useGameState()
  
  const hasAnyUpgradeForMaterial = (material: keyof Materials) => {
    if (material === "wood" || player[material] > 0) {
      return true
    }

    const materialUpgrades = Object.values(allUpgrades).filter(x => x.gatheredMaterial === material)
    return materialUpgrades.some(x => upgrades[x.key].count > 0)
  }
  
  const stateAfterGathering = calculateGatheredMaterials(upgrades, player)

  const isEventHappening = 
    randomEvents.wildfire.count > 0 
    || randomEvents.termites.count > 0
  
  const getMaterialsPerSec = (goods: Goods) => {
    const materialsPerSec = stateAfterGathering[goods.material] - player[goods.material] || 0
    return isEventHappening ? 0 : formatNumber(materialsPerSec)
  }

  return (
    <div className="playerStats">
      <div className="resources">
        <div className="gold stat">
          <i className="fas fa-coins"></i> Gold: {formatNumber(player.gold)}
        </div>
        {Object.values(allMarketGoods).map(x => 
          hasAnyUpgradeForMaterial(x.material) && (
            <div className="stat" key={x.material}>
              {x.icon} {x.label}: {formatNumber(player[x.material])} ({getMaterialsPerSec(x)}/s)
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PlayerStats