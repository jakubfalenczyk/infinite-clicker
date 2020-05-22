export interface TreeClickedParams {
  updatePlayerState(): void
  updateTreeState(): void
  isTreeDead: boolean
  playChoppingAudio(): void
  playTreeFallAudio(): void
}