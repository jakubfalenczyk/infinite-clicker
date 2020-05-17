import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { BaseState } from ".."
import _ from "lodash"
import { UpgradesState, UpgradesActions, defaultUpgradesState, defaultUpgradesActions } from "./model"

export type UpgradesContextType = UpgradesState & UpgradesActions & BaseState<UpgradesState>

export const defaultUpgradesContext: UpgradesContextType = {
  ...defaultUpgradesState,
  ...defaultUpgradesActions,
  importSavedState: _.noop,
  reset: _.noop,
}

const useUpgradesState = (): UpgradesContextType => {
  const { state, setState } = useStateWithLocalStorage(defaultUpgradesState, "upgrades")

  const updateUpgrades = (newState: UpgradesState) => setState(newState)

  const importSavedState = (savedState: UpgradesState) => setState(savedState)

  const reset = () => setState(defaultUpgradesState)

  return {
    ...state,
    updateUpgrades,
    importSavedState,
    reset,
  }
}

export default useUpgradesState