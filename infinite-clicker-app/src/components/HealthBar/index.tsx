import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"

const HealthBar = () => {
  const { tree } = useGameState()

  return (
    <div className="health-bar">
      <div className="life" style={{ width: tree.currentLife }}/>
      <span className="life-count">{tree.currentLife}%</span>
    </div>
  )
}

export default HealthBar
