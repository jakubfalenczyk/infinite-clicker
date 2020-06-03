import React from "react"
import { Achievement, AchievementCategory } from "gameState/achievements/model"

interface ToolsItemProps {
  category: AchievementCategory
  unlocked: Achievement[]
  locked: Achievement[]
}

const AchievementsCategory = (props: ToolsItemProps) => {
  const { category, unlocked, locked } = props

  return (
    <div className="row">
      <div className="category">
        {category.label}      
      </div>
      <div className="achievementCell">
        {unlocked && unlocked.map(x => (
          <div key={x.id} className="achievement unlocked">{x.valueLabel}</div>
        ))}
        {locked && locked.map(x => (
          <div key={x.id} className="achievement">
            <i className="fas fa-lock"></i>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsCategory