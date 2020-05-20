import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const FurnitureFactory = () => {
  const { upgrades } = useGameState()
  const usedPerSec = upgrades.furnitureFactories.count * allUpgrades.furnitureFactories.usedPerSec!
  const materialsPerSec = upgrades.furnitureFactories.count * allUpgrades.furnitureFactories.gatheredPerSec

  return (
    upgrades.lumberCamps.count > 0 
      ? <div className="furnitureFactory">
          <div className="count">{allUpgrades.furnitureFactories.label}: {upgrades.furnitureFactories.count}</div>
          <div className="gps"> [+{materialsPerSec} {allUpgrades.furnitureFactories.gatheredMaterial}/s]</div>
          <div className="gps"> [-{usedPerSec} {allUpgrades.furnitureFactories.usedMaterial}/s]</div>
        </div>
      : null
  )
}

export default FurnitureFactory