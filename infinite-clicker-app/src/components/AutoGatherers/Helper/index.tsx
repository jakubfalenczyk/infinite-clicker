import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const Helper = () => {
  const { upgrades } = useGameState()
  const materialsPerSec = upgrades.woodcutters.count * allUpgrades.woodcutters.gatheredPerSec

  return (
    upgrades.woodcutters.count > 0 
      ? <div className="helper">
          <div className="count">{allUpgrades.woodcutters.label}: {upgrades.woodcutters.count}</div>
          <div className="gps"> [+{materialsPerSec} {allUpgrades.woodcutters.gatheredMaterial}/s]</div>
        </div>
      : null
  )
}

export default Helper