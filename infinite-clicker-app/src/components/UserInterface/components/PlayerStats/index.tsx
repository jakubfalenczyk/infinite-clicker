import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { calculateGatheredMaterials } from "../Upgrades/calculateGatheredMaterials"

const PlayerStats = () => {
  const { player, upgrades } = useGameState()
  const gps = calculateGatheredMaterials(upgrades)

  return (
    <div className="playerStats">
      <div className="resources">
        <div className="gold">
          <i className="fas fa-coins"></i> Gold: {player.gold}
        </div>
        <div className="wood">
          <i className="fas fa-tree"></i> Wood: {player.wood} ({gps.wood || 0}/s)
        </div>
      </div>
    </div>
  )
}

export default PlayerStats