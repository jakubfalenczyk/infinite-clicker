export function getRandomItem<T>(array: T[], current?: T): T {
  const filteredArray = array.filter(x => current ? x !== current : true)
  const randomIndex = Math.floor(Math.random() * filteredArray.length)
  return filteredArray[randomIndex]
}