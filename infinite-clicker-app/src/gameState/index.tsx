import React, { useContext, createContext } from "react"
import usePlayerState, { defaultPlayerContext, PlayerContextType } from "./player/usePlayerState"
import useTreeState, { defaultTreeContext, TreeContextType } from "./tree/useTreeState"
import _ from "lodash"

export interface BaseState<StateType> {
  importSavedState: (savedState: StateType) => void
  reset: () => void
}

export interface GameStateContextType extends BaseState<GameStateContextType> {
  player: PlayerContextType
  tree: TreeContextType
  reset: () => void
}

const defaultGameStateContext: GameStateContextType = {
  player: defaultPlayerContext,
  tree: defaultTreeContext,
  importSavedState: _.noop,
  reset: _.noop,
}

const GameStateContext = createContext(defaultGameStateContext)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const player = usePlayerState()
  const tree = useTreeState()
  
  const importSavedState = (state: GameStateContextType) => {
    player.importSavedState(state.player)
    tree.importSavedState(state.tree)
  }

  const reset = () => {
    player.reset()
    tree.reset()
  }

  const gameState = {
    player,
    tree,
    importSavedState,
    reset,
  }
 
  return (
    <GameStateContext.Provider value={gameState}>
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