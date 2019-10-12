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

  const updateMaxLife = (newLife: number) => {
    setState({ 
      ...state, 
      maxLife: newLife
    })
  }

  const updateCurrentLife = (newLife: number) => {
    setState({ 
      ...state, 
      currentLife: newLife
    })
  }

  const importSavedState = (savedState: TreeState) => {
    setState(savedState)
  }

  const reset = () => {
    setState(defaultTreeState)
  }

  return {
    ...state,
    updateMaxLife,
    updateCurrentLife,
    importSavedState,
    reset,
  }
}

export default useTreeState