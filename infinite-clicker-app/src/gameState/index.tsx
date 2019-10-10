import React, { useContext, createContext } from "react"
import usePlayerState, { defaultPlayerContext, PlayerContextType } from "./usePlayerState"
import useTreeState, { TreeContextType, defaultTreeContext } from "./useTreeState"

interface GameStateContextType {
  player: PlayerContextType
  tree: TreeContextType
}

const defaultGameStateContext: GameStateContextType = {
  player: defaultPlayerContext,
  tree: defaultTreeContext
}

const GameStateContext = createContext(defaultGameStateContext)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const player = usePlayerState()
  const tree = useTreeState()
 
  return (
    <GameStateContext.Provider value={{ player, tree }}>
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