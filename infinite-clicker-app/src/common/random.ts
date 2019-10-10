export const getRandom = (max: number, min: number = 0) => {
  const randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min
  return randomNumber
}

export const getRandomItem = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * (array.length))
  return array[randomIndex]
}