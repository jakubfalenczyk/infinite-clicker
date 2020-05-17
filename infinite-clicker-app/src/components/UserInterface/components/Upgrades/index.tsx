import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import { Upgrade, allUpgrades } from "common/upgrades"
import UpgradeItem from "./components/UpgradeItem"

const Upgrades = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player, upgrades } = useGameState()

  const buyUpgrade = (upgrade: Upgrade) => {
    const playerHasEnoughMoney = player.gold >= upgrade.price

    if (!playerHasEnoughMoney) {
      return
    }

    player.updateState({
      ...player,
      gold: player.gold - upgrade.price,
    })
    
    upgrades.updateUpgrades({ 
      ...upgrades, 
      [upgrade.storeKey]: upgrades[upgrade.storeKey] + 1
    })
  }

  return (
    <>
      <div className="uiButton" onClick={onOpen}>
        Upgrades
        <div className="buttonIcon">
          <i className="fas fa-angle-double-up"></i>
        </div>
      </div>
      <GameModal
        className="upgradesModal"
        title="Upgrades"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="header">
          <div className="upgradeCell">
              Upgrade
          </div>
          <div className="priceCell">
              Price
          </div>
          <div className="countCell">
              Current count
          </div>
          <div className="actionCell">Buy</div>
        </div>
        {allUpgrades.map((u: Upgrade) => 
          <UpgradeItem item={u} buy={() => buyUpgrade(u)}/>)}
      </GameModal>
    </>
  )
}

export default Upgrades