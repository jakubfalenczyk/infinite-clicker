import { AudioControls } from "common/useSound";

export interface TreeClickedParams {
  updatedLife: number
  isTreeDead: boolean
  updatedWood: number
  choppingAudio: AudioControls
}