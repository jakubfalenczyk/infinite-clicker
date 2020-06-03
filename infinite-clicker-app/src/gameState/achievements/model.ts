import _ from "lodash"
import { GameStateContextType } from "gameState"

export interface AchievementCategory {
  id: number
  label: string
}

export interface Achievement {
  id: string
  category: AchievementCategory
  valueLabel: string
  isUnlocked: (gameState: GameStateContextType) => boolean
}

export interface AchievementsState {
  unlocked: Achievement[]
}

export const defaultAchievementsState: AchievementsState = {
  unlocked: []
}

export interface AchievementsActions {
  updateState(newState: AchievementsState) : void
}

export const defaultAchievementsActions: AchievementsActions = {
  updateState: _.noop,
}