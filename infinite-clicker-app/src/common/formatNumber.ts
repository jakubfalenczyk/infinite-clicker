export const formatNumber = (input: number) => input.toLocaleString("de-DE")

const mln = 1000000
const bln = 1000*mln
const tln = 1000*bln

export const formatNumberWithSuffix = (input: number) => {
  let formatted = input
  let suffix = ""

  if (input >= mln) {
    formatted = formatted / mln
    suffix = "mln"
  }

  if (input >= bln) {
    formatted = formatted / 1000
    suffix = "bln"
  }

  if (input >= tln) {
    formatted = formatted / 1000
    suffix = "tln"
  }

  return `${formatNumber(formatted)} ${suffix}`
}