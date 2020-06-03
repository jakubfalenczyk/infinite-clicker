import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { BaseState } from ".."
import _ from "lodash"
import { AchievementsState, AchievementsActions, defaultAchievementsState, defaultAchievementsActions } from "./model"

export type AchievementsContextType = AchievementsState & AchievementsActions & BaseState<AchievementsState>

export const defaultAchievementsContext: AchievementsContextType = {
  ...defaultAchievementsState,
  ...defaultAchievementsActions,
  importSavedState: _.noop,
  reset: _.noop,
}

const useAchievements = (): AchievementsContextType => {
  const { state, setState } = useStateWithLocalStorage(defaultAchievementsState, "achievements")

  const updateState = (newState: AchievementsState) => setState(newState)

  const importSavedState = (savedState: AchievementsState) => setState(savedState)

  const reset = () => setState(defaultAchievementsState)

  return {
    ...state,
    updateState,
    importSavedState,
    reset,
  }
}

export default useAchievements