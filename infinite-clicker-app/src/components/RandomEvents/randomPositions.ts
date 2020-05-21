interface Position {
  top: string
  left?: string
  right?: string
}

const leftOffsets = [
  "15%", "20%", "25%", "30%", "40%", "50%", "60%", "70%", "75%", "80%", "85%"
]

export const randomPositions: Position[] = [
  // tree line positions
  ...leftOffsets.map(offset => ({ top: "150px", left: offset })),
  ...leftOffsets.map(offset => ({ top: "170px", left: offset })),

  // lumber camp positions
  { top: "385px", left: "40px" },
  { top: "385px", left: "100px" },
  { top: "385px", left: "265px" },
  { top: "385px", left: "400px" },

  // furniture factory positions
  { top: "660px", left: "220px" },
  { top: "610px", left: "275px" },
  { top: "610px", left: "360px" },
  { top: "660px", left: "440px" },

  // paper factory positions
  { top: "575px", left: "500px" },
  { top: "540px", left: "575px" },
  { top: "520px", left: "640px" },
]