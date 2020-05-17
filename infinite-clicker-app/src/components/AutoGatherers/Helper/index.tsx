import React, { useEffect } from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import { allUpgrades } from "common/upgrades"

const Helper = () => {
  const { upgrades, player } = useGameState()
  const woodcuttersUpgrade = allUpgrades.find(u => u.storeKey === "woodcutters")
  const goldPerSec = upgrades.woodcutters * woodcuttersUpgrade!.goldPerSec

  useEffect(() => {
    const interval = setInterval(() => {
      player.updateState({ 
        ...player,
        gold: player.gold + goldPerSec
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [goldPerSec, player]);

  return (
    <div className="helper">
      <div className="count">Count: {upgrades.woodcutters}</div>
      <div className="goldPerSec">Gold per sec: {goldPerSec}</div>
    </div>
  )
}

export default Helper