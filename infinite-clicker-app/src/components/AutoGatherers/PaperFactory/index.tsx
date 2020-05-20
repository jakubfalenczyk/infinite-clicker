import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const PaperFactory = () => {
  const { upgrades } = useGameState()
  const usedPerSec = upgrades.paperFactories.count * allUpgrades.paperFactories.usedPerSec!
  const materialsPerSec = upgrades.paperFactories.count * allUpgrades.paperFactories.gatheredPerSec

  return (
    upgrades.lumberCamps.count > 0 
      ? <div className="paperFactory">
          <div className="count">{allUpgrades.paperFactories.label}: {upgrades.paperFactories.count}</div>
          <div className="gps"> [+{materialsPerSec} {allUpgrades.paperFactories.gatheredMaterial}/s]</div>
          <div className="gps"> [-{usedPerSec} {allUpgrades.paperFactories.usedMaterial}/s]</div>
        </div>
      : null
  )
}

export default PaperFactory