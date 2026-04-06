export function formatPhone(rawValue: string) {
  let digits = rawValue.replace(/\D/g, '')

  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (!digits.startsWith('7')) digits = `7${digits}`
  digits = digits.slice(0, 11)

  const country = '+7'
  const part1 = digits.slice(1, 4)
  const part2 = digits.slice(4, 7)
  const part3 = digits.slice(7, 9)
  const part4 = digits.slice(9, 11)

  let formatted = country
  if (part1) formatted += ` (${part1}`
  if (part1.length === 3) formatted += ')'
  if (part2) formatted += ` ${part2}`
  if (part3) formatted += `-${part3}`
  if (part4) formatted += `-${part4}`

  return formatted
}
