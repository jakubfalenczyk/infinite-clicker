import { AudioControls } from "common/useSound";

export interface TreeClickedParams {
  updatedLife: number
  currentGold: number
  isTreeDead: boolean
  updatedWood: number
  choppingAudio: AudioControls
}