import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import Button from "components/GameModal/components/Button"
import { Upgrade, allUpgrades } from "common/upgrades"

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
        {allUpgrades.map((u: Upgrade) => 
          <div key={u.storeKey} className="upgradesRow">
            <div className="upgradesCell">
              <div className="label">
                {u.icon} {u.label}
              </div>
            </div>
            <div className="upgradesCell">
              <div className="label">
                {u.price} <i className="fas fa-coins"></i> 
              </div>
            </div>
            <div className="upgradesCell">
              <div className="label">
                Current count: {upgrades[u.storeKey]}
              </div>
            </div>
            <div className="marketCell">
              <Button onClick={() => buyUpgrade(u)}>
                <i className="fas fa-plus"></i>
              </Button>
            </div>
          </div>  
        )}
      </GameModal>
    </>
  )
}

export default Upgrades