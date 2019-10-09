import React, { useContext, createContext, useReducer } from "react"
import { defaultGameState, GameState } from "./stateModels"

export enum GameStateActionType {
  PlayerAddWood,
  PlayerUpdateAxeDamage,
  TreeUpdateMaxLife,
  TreeUpdateCurrentLife,
}

interface GameStateAction {
  type: GameStateActionType
  payload: any
}

const reducer = (state: GameState, action: GameStateAction): GameState => {
  const { player, tree } = state

  switch (action.type) {
    case GameStateActionType.PlayerAddWood:
      return {
        ...state,
        player: {
          ...player,
          wood: player.wood + action.payload
        }
      }
    case GameStateActionType.PlayerUpdateAxeDamage:
      return {
        ...state,
        player: {
          ...player,
          axeDamage: action.payload
        }
      }
    case GameStateActionType.TreeUpdateMaxLife:
      return {
        ...state,
        tree: {
          ...tree,
          maxLife: action.payload
        }
      }
    case GameStateActionType.TreeUpdateCurrentLife:
      return {
        ...state,
        tree: {
          ...tree,
          currentLife: action.payload
        }
      }
    default:
      return state
  }
}

interface GameStateContextType {
  gameState: GameState
  dispatch(action: GameStateAction): void 
}

const GameStateContext = createContext({} as GameStateContextType)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, defaultGameState)

  return (
    <GameStateContext.Provider value={{ gameState: state, dispatch: dispatch }}>
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