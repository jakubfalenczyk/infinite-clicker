import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import UIButton from "../UIButton"
import { useGameState } from "gameState"

interface MobileMenuProps {
  allMenuItems: JSX.Element
}

const MobileMenu = (props: MobileMenuProps) => {
  const { player } = useGameState()
  const [isOpen, setIsOpen] = useState(player.isNewPlayer)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <>
      <UIButton
        className="burger"
        label=""
        onClick={onOpen}
        icon={<i className="fas fa-bars"></i>}
      />
      <GameModal
        className="mobileMenu"
        title="Menu"
        isOpen={isOpen}
        onClose={onClose}
      >
        {props.allMenuItems}
      </GameModal>
    </>
  )
}

export default MobileMenu