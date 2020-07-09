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

const MobileUpgrades = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <>
      <UIButton 
        label="Owned upgrades"
        onClick={onOpen}
        icon={<i className="fas fa-building"></i>}
      />
      <GameModal
        className="ownedUpgrades"
        title="Owned upgrades"
        isOpen={isOpen}
        onClose={onClose}
      >
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