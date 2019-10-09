export interface PlayerState {
  wood: number
  gold: number
  axeDamage: number
}

export interface TreeState {
  maxLife: number
  currentLife: number
  wood: number
}

export interface GameState {
  player: PlayerState
  tree: TreeState
}

const defaultTreeLife = 100

export const defaultGameState: GameState = {
  player: {
    gold: 0,
    axeDamage: 10,
    wood: 0,
  },
  tree: {
    maxLife: defaultTreeLife,
    currentLife: defaultTreeLife,
    wood: 10,
  }
}