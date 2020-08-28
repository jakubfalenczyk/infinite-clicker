import _ from "lodash"
import React, { useState } from "react"
import GameModal from "components/GameModal"
import Button from "components/GameModal/components/Button"
import { useGameState } from "gameState"
import { Achievement } from "gameState/achievements/model"
import { allAchievements } from "../allAchievements"

const BonusesModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const { achievements } = useGameState()
  const unlockedGroupedByCategory = _.groupBy(achievements.unlocked, a => a.category.id)

  const getBonusValue = (achievements: Achievement[]) => {
    const summedValue = achievements
      .map(a => allAchievements.find(b => a.id === b.id))
      .filter(a => a !== undefined)
      .map(a => a!)
      .reduce((a, b) => ({
          ...a,
          boostValue: a.boostValue + b.boostValue
        }
      ))

    return `+${summedValue.boostValue}% ${summedValue.boostedResource}/s`
  }

  return (
    <>
      <div className="bonusesButton">
        <Button onClick={onOpen}>
          Active bonuses <i className="fas fa-award"></i>
        </Button>
      </div>
      <GameModal
        className="bonusesModal"
        title="Active bonuses"
        isOpen={isOpen}
        onClose={onClose}
      >
        {(!achievements.unlocked || achievements.unlocked.length === 0) &&
          <div className="category">No currently active bonuses.<br/> Unlock more achievements.</div>
        }
        {Object.values(unlockedGroupedByCategory).map(list => (
          list.length > 0 &&
            <div className="category" key={list[0].category.id}>{list[0].category.label}: {getBonusValue(list)}</div>
        ))}
      </GameModal>
    </>
  )
}

export default BonusesModal