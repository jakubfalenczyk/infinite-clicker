import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import UIButton from "../UIButton"
import Helper from "components/AutoGatherers/Helper"
import Buldozer from "components/AutoGatherers/Buldozer"
import Burner from "components/AutoGatherers/Burner"
import LumberCamp from "components/AutoGatherers/LumberCamp"
import PaperFactory from "components/AutoGatherers/PaperFactory"
import FurnitureFactory from "components/AutoGatherers/FurnitureFactory"
import { useGameState } from "gameState"
import { allUpgrades } from "gameState/upgrades/allUpgrades"
import { UpgradesState } from "gameState/upgrades/model"
import classNames from "classnames"

const MobileUpgrades = () => {
  const { upgrades } = useGameState()
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const isEmpty = Object.keys(allUpgrades)
    .every(k => upgrades[k as keyof UpgradesState].count === 0)

  const modalClassName = classNames(
    "ownedUpgrades",
    isEmpty && "emptyUpgrades"
  )

  return (
    <>
      <UIButton 
        label="Owned upgrades"
        onClick={onOpen}
        icon={<i className="fas fa-building"></i>}
      />
      <GameModal
        className={modalClassName}
        title="Owned upgrades"
        isOpen={isOpen}
        onClose={onClose}
      >
        {isEmpty && <div>You don't have any upgrades yet.<br/> Go to Upgrades screen to buy some.</div>}
        <Helper/>
        <Buldozer/>
        <Burner/>
        <LumberCamp/>
        <PaperFactory/>
        <FurnitureFactory/>
      </GameModal>
    </>
  )
}

export default MobileUpgrades