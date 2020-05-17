import { 
  TreeState,
  TreeActions,
  defaultTreeState,
  defaultTreeActions
} from "./model"
import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { BaseState } from ".."
import _ from "lodash"

export type TreeContextType = TreeState & TreeActions & BaseState<TreeState>

export const defaultTreeContext: TreeContextType = {
  ...defaultTreeState,
  ...defaultTreeActions,
  importSavedState: _.noop,
  reset: _.noop,
}

const useTreeState = (): TreeContextType => {
  const { state, setState } = useStateWithLocalStorage(defaultTreeState, "tree")

  const updateTreeState = (newState: TreeState) => setState(newState)

  const importSavedState = (savedState: TreeState) => setState(savedState)

  const reset = () => setState(defaultTreeState)

  return {
    ...state,
    updateTreeState,
    importSavedState,
    reset,
  }
}

export default useTreeState