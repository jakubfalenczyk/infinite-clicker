import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import UIButton from "../UIButton"

interface MobileMenuProps {
  allMenuItems: JSX.Element
}

const MobileMenu = (props: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
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