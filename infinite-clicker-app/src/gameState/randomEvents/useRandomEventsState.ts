import { useStateWithLocalStorage } from "../../common/useStateWithLocalStorage"
import { BaseState } from ".."
import _ from "lodash"
import { 
  RandomEventsState,
  RandomEventsActions,
  defaultRandomEventsState,
  defaultRandomEventsActions
} from "./model"

export type RandomEventsContextType = 
  RandomEventsState & RandomEventsActions & BaseState<RandomEventsState>

export const defaultRandomEventsContext: RandomEventsContextType = {
  ...defaultRandomEventsState,
  ...defaultRandomEventsActions,
  importSavedState: _.noop,
  reset: _.noop,
}

const useRandomEventsState = (): RandomEventsContextType => {
  const { state, setState } = useStateWithLocalStorage(defaultRandomEventsState, "randomEvents")

  const updateState = (newState: RandomEventsState) => setState(newState)

  const importSavedState = (savedState: RandomEventsState) => setState(savedState)

  const reset = () => setState(defaultRandomEventsState)

  return {
    ...state,
    updateState,
    importSavedState,
    reset,
  }
}

export default useRandomEventsState