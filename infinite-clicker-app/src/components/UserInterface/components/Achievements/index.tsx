import _ from "lodash"
import React, { useState } from "react"
import "./styles.scss"
import GameModal from "components/GameModal"
import { useGameState } from "gameState"
import UIButton from "../UIButton"
import AchievementsCategory from "./components/AchievementsCategory"
import { allAchievements, allCategories } from "./allAchievements"
import BonusesModal from "./components/BonusesModal"

const Achievements = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const { achievements } = useGameState()
  const unlockedByCategory = _.groupBy(achievements.unlocked, x => x.category.id)
  const locked = allAchievements.filter(x => !achievements.unlocked.some(y => y.id === x.id))
  const lockedByCategory = _.groupBy(locked, x => x.category.id)

  return (
    <>
      <UIButton 
        label="Achievements"
        onClick={onOpen}
        icon={<i className="fas fa-trophy"></i>}
      />
      <GameModal
        className="achievementsModal"
        title="Achievements"
        isOpen={isOpen}
        onClose={onClose}
      >
        <BonusesModal/>
        {allCategories.map(category => (
          <AchievementsCategory
            key={category.id}
            category={category}
            unlocked={unlockedByCategory[category.id]}
            locked={lockedByCategory[category.id]}
          />
        ))}
      </GameModal>
    </>
  )
}

export default Achievements