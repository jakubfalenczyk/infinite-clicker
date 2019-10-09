import React, { useContext, createContext, useReducer } from "react"
import { defaultGameState, GameState } from "./stateModels"

type GameStateActionType =
  "Player_UpdateWood" |
  "Player_UpdateAxeDamage" |
  "Tree_UpdateMaxLife" |
  "Tree_UpdateCurrentLife"

interface GameStateAction {
  type: GameStateActionType
  payload: any
}

const reducer = (state: GameState, action: GameStateAction): GameState => {
  const { player, tree } = state

  switch (action.type) {
    case "Player_UpdateWood":
      return {
        ...state,
        player: {
          ...player,
          wood: action.payload
        }
      }
    case "Player_UpdateAxeDamage":
      return {
        ...state,
        player: {
          ...player,
          axeDamage: action.payload
        }
      }
    case "Tree_UpdateMaxLife":
      return {
        ...state,
        tree: {
          ...tree,
          maxLife: action.payload
        }
      }
    case "Tree_UpdateCurrentLife":
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