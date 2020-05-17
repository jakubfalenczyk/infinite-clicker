import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "common/upgrades"

const Helper = () => {
  const { upgrades } = useGameState()
  const woodcuttersUpgrade = allUpgrades.find(u => u.storeKey === "woodcutters")
  const goldPerSec = upgrades.woodcutters * woodcuttersUpgrade!.goldPerSec

  return (
    <div className="helper">
      <div className="count">Count: {upgrades.woodcutters}</div>
      <div className="goldPerSec">Gold per sec: {goldPerSec}</div>
    </div>
  )
}

export default Helper