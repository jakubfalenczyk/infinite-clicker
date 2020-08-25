import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import UpgradeItem from "./components/UpgradeItem"
import { UpgradeParams, allUpgrades } from "../../../../gameState/upgrades/allUpgrades"
import UIButton from "../UIButton"
import useSound from "common/useSound"
import ReactGA from "react-ga"

const Upgrades = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { player, upgrades } = useGameState()
  const disabledClickSound = useSound("sounds-disabled-click")
  const upgradeSound = useSound("sounds-upgrade")

  const buyUpgrade = (upgrade: UpgradeParams) => {
    const playerHasEnoughMoney = player.gold >= upgrades[upgrade.key].price

    if (!playerHasEnoughMoney) {
      disabledClickSound.play()
      return
    }

    upgradeSound.play()

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

    ReactGA.event({
      category: "Upgrades",
      action: "Bought new upgrade",
      label: upgrade.key,
      value: upgrades[upgrade.key].count + 1,
    })
  }

  return (
    <>
      <UIButton 
        label="Upgrades"
        onClick={onOpen}
        icon={<i className="fas fa-angle-double-up"></i>}
      />
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
              Owned
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