import { 
  PlayerState,
  PlayerActions,
  defaultPlayerState,
  defaultPlayerActions
} from "./stateModels"
import { useStateWithLocalStorage } from "../common/useStateWithLocalStorage"

export type PlayerContextType = PlayerState & PlayerActions

export const defaultPlayerContext: PlayerContextType = {
  ...defaultPlayerState,
  ...defaultPlayerActions,
}

const usePlayerState = (): PlayerState & PlayerActions => {
  const { state, setState } = useStateWithLocalStorage(defaultPlayerState, "player")

  const addWood = (wood: number) => {
    setState({ 
      ...state, 
      wood: state.wood + wood
    })
  }

  const updateAxeDamage = (newDamage: number) => {
    setState({ 
      ...state, 
      axeDamage: newDamage
    })
  }

  return {
    ...state,
    addWood,
    updateAxeDamage
  }
}

export default usePlayerState