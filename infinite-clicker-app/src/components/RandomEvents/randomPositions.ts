import { CSSProperties } from "react"

export const getRandomPositions = (count: number) => {
  const randomPositions: CSSProperties[] = Array.from({ length: count }, () => {
    const top = Math.floor(Math.random() * 30 + 20)
    const horizontal = Math.floor(Math.random() * 50 + 20)  
  
    const isLeft = Math.floor(Math.random() * 2)

    return isLeft 
      ? { top: `${top}%`, left: `${horizontal}%` }
      : { top: `${top}%`, right: `${horizontal}%` }
  })

  return randomPositions
}