import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const LumberCamp = () => {
  const { upgrades } = useGameState()
  const usedPerSec = upgrades.lumberCamps.count * allUpgrades.lumberCamps.usedPerSec!
  const materialsPerSec = upgrades.lumberCamps.count * allUpgrades.lumberCamps.gatheredPerSec

  return (
    upgrades.lumberCamps.count > 0 
      ? <div className="lumberCamp">
          <div className="count">{allUpgrades.lumberCamps.label}: {upgrades.lumberCamps.count}</div>
          <div className="gps"> [+{materialsPerSec} {allUpgrades.lumberCamps.gatheredMaterial}/s]</div>
          <div className="gps"> [-{usedPerSec} {allUpgrades.lumberCamps.usedMaterial}/s]</div>
        </div>
      : null
  )
}

export default LumberCamp