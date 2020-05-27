import _ from "lodash"
import { AudioControls } from "common/useSound"

export type MusicType = "bg" | "wildfire" | "termites"

export interface MusicState {
  currentMusic: React.MutableRefObject<AudioControls>
  changeMusic(type: MusicType, soundsOn: boolean): void
}

export const defaultMusicState: MusicState = {
  currentMusic: {} as any,
  changeMusic: _.noop,
}