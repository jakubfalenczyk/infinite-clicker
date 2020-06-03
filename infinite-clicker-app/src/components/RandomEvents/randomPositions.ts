import { CSSProperties } from "react"

export const getRandomPositions = (count: number) => {
  const randomPositions: CSSProperties[] = Array.from({ length: count }, () => {
    const top = Math.floor(Math.random() * 700 + 70)
    const horizontal = Math.floor(Math.random() * 400 + 100)  
  
    const isLeft = Math.floor(Math.random() * 2)
    
    return isLeft 
      ? { top, left: horizontal }
      : { top, right: horizontal }
  })

  return randomPositions
}