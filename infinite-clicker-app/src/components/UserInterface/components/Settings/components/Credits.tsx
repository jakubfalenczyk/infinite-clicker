import React, { useState } from "react"
import Button from "components/GameModal/components/Button"
import GameModal from "components/GameModal"

const Credits = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <>
      <Button onClick={onOpen}>Credits</Button>
      <GameModal 
        className="creditsModal"
        title="Credits"
        isOpen={isOpen}
        onClose={onClose}
        isNested={true}
        actions={<Button onClick={onClose}>Ok</Button>}
      >
        This game has been created by Jakub Falenczyk<br/><br/>
        You can find me on LinkedIn:<br/>
        <a className="creditsLink" href="https://linkedin.com/in/jakubfalenczyk" target="_blank" rel="noopener noreferrer">
          https://linkedin.com/in/jakubfalenczyk
        </a>
        <br/>
        If you're interested in learning web development while building browser games, I encourage you to visit my website:
        <a className="creditsLink" href="https://programmingrush.com/" target="_blank" rel="noopener noreferrer">
        https://programmingrush.com/
        </a>
        <br/>
        <span>
          This game is using assets from:<br/>
          <a className="creditsLink" href="https://kenney.nl" target="_blank" rel="noopener noreferrer">
            kenney.nl
          </a><br/>
          <a className="creditsLink" href="https://www.vecteezy.com/free-vector/termite">Vecteezy.com</a>
        </span>
        <br/>
        <span>
        and music/sounds from:<br/>
          <a className="creditsLink" href="https://zapsplat.com/" target="_blank" rel="noopener noreferrer">
            https://zapsplat.com/
          </a>
        </span>
        <br/>
      </GameModal>  
    </>
  )
}

export default Credits