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
  let updatedState = state

  switch (action.type) {
    case GameStateActionType.PlayerAddWood:
      updatedState = {
        ...state,
        player: {
          ...player,
          wood: player.wood + action.payload
        }
      }
      break
    case GameStateActionType.PlayerUpdateAxeDamage:
      updatedState = {
        ...state,
        player: {
          ...player,
          axeDamage: action.payload
        }
      }
      break
    case GameStateActionType.TreeUpdateMaxLife:
      updatedState = {
        ...state,
        tree: {
          ...tree,
          maxLife: action.payload
        }
      }
      break
    case GameStateActionType.TreeUpdateCurrentLife:
      updatedState = {
        ...state,
        tree: {
          ...tree,
          currentLife: action.payload
        }
      }
      break
  }

  localStorage.setItem("gameState", JSON.stringify(updatedState))
  return updatedState
}

interface GameStateContextType {
  gameState: GameState
  dispatch(action: GameStateAction): void 
}

const GameStateContext = createContext({} as GameStateContextType)

const GameStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const save = localStorage.getItem("gameState")
  const savedState = save ? JSON.parse(save) : defaultGameState
  const [state, dispatch] = useReducer(reducer, savedState)

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