import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "common/upgrades"

const Helper = () => {
  const { upgrades } = useGameState()
  const woodcuttersUpgrade = allUpgrades.find(u => u.storeKey === "woodcutters")
  const goldPerSec = upgrades.woodcutters * woodcuttersUpgrade!.goldPerSec

  return (
    upgrades.woodcutters > 0 
      ? <div className="helper">
          <div className="count">Woodcutters: {upgrades.woodcutters}</div>
          <div className="gps"> [{goldPerSec} gold/s]</div>
        </div>
      : null
  )
}

export default Helper