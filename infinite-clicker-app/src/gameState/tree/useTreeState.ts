import { 
  TreeState,
  TreeActions,
  defaultTreeState,
  defaultTreeActions
} from "./model"
import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { ImportSavedState } from ".."
import _ from "lodash"

export type TreeContextType = TreeState & TreeActions & ImportSavedState<TreeState>

export const defaultTreeContext: TreeContextType = {
  ...defaultTreeState,
  ...defaultTreeActions,
  importSavedState: _.noop
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

  return {
    ...state,
    updateMaxLife,
    updateCurrentLife,
    importSavedState,
  }
}

export default useTreeState