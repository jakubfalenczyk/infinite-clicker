import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "components/UserInterface/components/Upgrades/allUpgrades"

const Helper = () => {
  const { upgrades } = useGameState()
  const woodcuttersUpgrade = allUpgrades.find(u => u.storeKey === "woodcutters")
  const materialsPerSec = upgrades.woodcutters * woodcuttersUpgrade!.gatheredPerSec

  return (
    upgrades.woodcutters > 0 
      ? <div className="helper">
          <div className="count">Woodcutters: {upgrades.woodcutters}</div>
          <div className="gps"> [{materialsPerSec} {woodcuttersUpgrade!.gatheredMaterial}/s]</div>
        </div>
      : null
  )
}

export default Helper