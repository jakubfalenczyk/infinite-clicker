import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"

const Market = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <>
      <div className="marketButton woodenButton" onClick={onOpen}>
        Market
        <div className="buttonIcon">
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
      <GameModal
        title="Market"
        isOpen={isOpen}
        onClose={onClose}
      >
        Market content
      </GameModal>
    </>
  )
}

export default Market