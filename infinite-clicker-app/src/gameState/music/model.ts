import _ from "lodash"
import { AudioControls } from "common/useSound"

export interface MusicState extends AudioControls {
}

export const defaultMusicState: MusicState = {
  changeTrackAndPlay: _.noop,
  changeTrack: _.noop,
  play: _.noop,
}