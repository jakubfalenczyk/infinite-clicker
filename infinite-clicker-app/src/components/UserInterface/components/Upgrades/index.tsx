import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import UpgradeItem from "./components/UpgradeItem"
import { UpgradeParams, allUpgrades } from "../../../../gameState/upgrades/allUpgrades"

const Upgrades = () => {
  const [isOpen, setIsOpen] = useState(true)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player, upgrades } = useGameState()

  const buyUpgrade = (upgrade: UpgradeParams) => {
    const playerHasEnoughMoney = player.gold >= upgrades[upgrade.key].price

    if (!playerHasEnoughMoney) {
      return
    }

    player.updateState({
      ...player,
      gold: player.gold - upgrades[upgrade.key].price,
    })
    
    upgrades.updateState({ 
      ...upgrades, 
      [upgrade.key]: { 
        count: upgrades[upgrade.key].count + 1,
        price: Math.floor(upgrades[upgrade.key].price * upgrade.priceMultiplier)
      }
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
        {Object.values(allUpgrades).map(value => (
          <UpgradeItem key={value.key} item={value} buy={() => buyUpgrade(value)}/>
        ))}
      </GameModal>
    </>
  )
}

export default Upgrades