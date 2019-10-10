import { 
  TreeState,
  TreeActions,
  defaultTreeState,
  defaultTreeActions
} from "./stateModels"
import { useStateWithLocalStorage } from "../common/useStateWithLocalStorage"

export type TreeContextType = TreeState & TreeActions

export const defaultTreeContext: TreeContextType = {
  ...defaultTreeState,
  ...defaultTreeActions,
}

const useTreeState = (): TreeState & TreeActions => {
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

  return {
    ...state,
    updateMaxLife,
    updateCurrentLife
  }
}

export default useTreeState