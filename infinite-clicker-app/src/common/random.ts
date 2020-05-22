export function getRandomItem<T>(array: T[], current?: T): T {
  const filteredArray = array.filter(x => current ? x !== current : true)
  const randomIndex = Math.floor(Math.random() * filteredArray.length)
  return filteredArray[randomIndex]
}

export function getDistinctRandomItems<T>(array: T[], count: number): T[] {
  let distinctItems: T[] = []

  while(distinctItems.length < count) {
    const random = getRandomItem(array.filter(y => !distinctItems.includes(y)))
    distinctItems.push(random)
  }

  return distinctItems
}

export function testByPercentage(percentage: number): boolean {
  const randomNumber = Math.floor(Math.random() * 100)
  return randomNumber <= percentage
}