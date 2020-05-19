import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const Burner = () => {
  const { upgrades } = useGameState()
  const usedPerSec = upgrades.burners.count * allUpgrades.burners.usedPerSec!
  const materialsPerSec = upgrades.burners.count * allUpgrades.burners.gatheredPerSec

  return (
    upgrades.burners.count > 0 
      ? <div className="burner">
          <div className="count">{allUpgrades.burners.label}: {upgrades.burners.count}</div>
          <div className="gps"> [+{materialsPerSec} {allUpgrades.burners.gatheredMaterial}/s]</div>
          <div className="gps"> [-{usedPerSec} {allUpgrades.burners.usedMaterial}/s]</div>
          <div className="fire"></div>
        </div>
      : null
  )
}

export default Burner