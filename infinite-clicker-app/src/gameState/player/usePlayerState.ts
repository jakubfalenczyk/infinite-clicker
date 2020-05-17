import { 
  PlayerState,
  PlayerActions,
  defaultPlayerState,
  defaultPlayerActions
} from "./model"
import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { BaseState } from ".."
import _ from "lodash"

export type PlayerContextType = PlayerState & PlayerActions & BaseState<PlayerState>

export const defaultPlayerContext: PlayerContextType = {
  ...defaultPlayerState,
  ...defaultPlayerActions,
  importSavedState: _.noop,
  reset: _.noop,
}

const usePlayerState = (): PlayerContextType => {
  const { state, setState } = useStateWithLocalStorage(defaultPlayerState, "player")

  const updateState = (newState: PlayerState) => setState(newState)

  const importSavedState = (savedState: PlayerState) => setState(savedState)

  const reset = () => setState(defaultPlayerState)

  return {
    ...state,
    updateState,
    importSavedState,
    reset,
  }
}

export default usePlayerState