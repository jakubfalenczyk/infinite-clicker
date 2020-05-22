import _ from "lodash"
import { AudioControls } from "common/useSound"

export interface MusicState extends AudioControls {
}

export const defaultMusicState: MusicState = {
  changeTrack: _.noop,
  play: _.noop,
}