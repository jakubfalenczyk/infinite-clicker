import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"

const Buldozer = () => {
  const { upgrades } = useGameState()
  const materialsPerSec = upgrades.buldozers.count * allUpgrades.buldozers.gatheredPerSec

  return (
    upgrades.buldozers.count > 0 
      ? <div className="buldozer">
          <div className="count">Buldozers: {upgrades.buldozers.count}</div>
          <div className="gps"> [{materialsPerSec} {allUpgrades.buldozers.gatheredMaterial}/s]</div>
        </div>
      : null
  )
}

export default Buldozer