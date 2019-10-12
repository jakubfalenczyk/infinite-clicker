import React, { useContext, createContext } from "react"
import usePlayerState, { defaultPlayerContext, PlayerContextType } from "./player/usePlayerState"
import useTreeState, { defaultTreeContext, TreeContextType } from "./tree/useTreeState"
import _ from "lodash"

export interface ImportSavedState<StateType> {
  importSavedState: (savedState: StateType) => void 
}

export interface GameStateContextType extends ImportSavedState<GameStateContextType> {
  player: PlayerContextType
  tree: TreeContextType
}

const defaultGameStateContext: GameStateContextType = {
  player: defaultPlayerContext,
  tree: defaultTreeContext,
  importSavedState: _.noop
}

const GameStateContext = createContext(defaultGameStateContext)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const player = usePlayerState()
  const tree = useTreeState()
  
  const importSavedState = (state: GameStateContextType) => {
    player.importSavedState(state.player)
    tree.importSavedState(state.tree)
  }
 
  return (
    <GameStateContext.Provider value={{ player, tree, importSavedState }}>
      {children}
    </GameStateContext.Provider>
  )
}

const useGameState = () => {
  return useContext(GameStateContext)
}

export {
  GameStateProvider,
  useGameState,
}