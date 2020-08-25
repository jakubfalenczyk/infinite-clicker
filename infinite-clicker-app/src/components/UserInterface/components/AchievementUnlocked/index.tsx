import React from "react"
import "./styles.scss"
import { useGameState } from "gameState"
import GameModal from "components/GameModal"
import Button from "components/GameModal/components/Button"
import ReactGA from "react-ga"

const AchievementUnlocked = () => {
  const { achievements } = useGameState()
  const unlocked = achievements.unlocked.find(x => !x.shown)
  
  const onClose = () => {
    if (unlocked) {
      const index = achievements.unlocked.findIndex(x => x.id === unlocked.id)
      achievements.unlocked.splice(index, 1, { ...unlocked, shown: true })

      achievements.updateState({
        unlocked: achievements.unlocked
      })
    }
  }

  if (unlocked) {
    ReactGA.event({
      category: "Achievement",
      action: "Unlocked",
      label: unlocked.category.label + " " + unlocked.valueLabel,
    })
  }
  
  return (
    <GameModal
      className="achievementModal"
      title=""
      isOpen={unlocked !== undefined}
      onClose={onClose}
      overlayClassName="achievementModalOverlay"
      noExternalClosing={true}
      hideTitle={true}
    >
      {unlocked &&
        <div className="message">
          <h2>Achievement unlocked!</h2>
          <h2>{unlocked.category.label} [{unlocked.valueLabel}]</h2>
          <Button onClick={onClose}>Ok</Button>
        </div>
      }
    </GameModal>
  )
}

export default AchievementUnlocked