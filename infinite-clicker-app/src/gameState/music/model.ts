import _ from "lodash"

export type MusicType = "bg" | "wildfire" | "termites"

export interface MusicState {
  currentMusic: React.MutableRefObject<HTMLAudioElement | null>
  changeMusic(type: MusicType, soundsOn: boolean): void
}

export const defaultMusicState: MusicState = {
  currentMusic: {} as any,
  changeMusic: _.noop,
}