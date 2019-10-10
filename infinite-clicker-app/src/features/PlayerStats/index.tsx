import React from "react"
import { useGameState } from "../../gameState"
import "./styles.scss"

const PlayerStats = () => {
  const { player } = useGameState()

  return (
    <div className="playerStats">
      <div className="resources">
        <div className="gold">
          <i className="fas fa-coins"></i> Gold: {player.gold}
        </div>
        <div className="wood">
          <i className="fas fa-tree"></i> Wood: {player.wood}
        </div>
      </div>
    </div>
  )
}

export default PlayerStats