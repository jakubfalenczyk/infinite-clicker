import React, { useContext, createContext } from "react"
import usePlayerState, { defaultPlayerContext, PlayerContextType } from "./player/usePlayerState"
import useTreeState, { defaultTreeContext, TreeContextType } from "./tree/useTreeState"
import _ from "lodash"
import useUpgradesState, { UpgradesContextType, defaultUpgradesContext } from "./upgrades/useUpgradesState"

export interface BaseState<StateType> {
  importSavedState: (savedState: StateType) => void
  reset: () => void
}

export interface GameStateContextType extends BaseState<GameStateContextType> {
  player: PlayerContextType
  tree: TreeContextType
  upgrades: UpgradesContextType
  reset: () => void
}

const defaultGameStateContext: GameStateContextType = {
  player: defaultPlayerContext,
  tree: defaultTreeContext,
  upgrades: defaultUpgradesContext,
  importSavedState: _.noop,
  reset: _.noop,
}

const GameStateContext = createContext(defaultGameStateContext)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const player = usePlayerState()
  const tree = useTreeState()
  const upgrades = useUpgradesState()
  
  const importSavedState = (state: GameStateContextType) => {
    player.importSavedState(state.player)
    tree.importSavedState(state.tree)
    upgrades.importSavedState(state.upgrades)
  }

  const reset = () => {
    player.reset()
    tree.reset()
    upgrades.reset()
  }

  const gameState = {
    player,
    tree,
    upgrades,
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