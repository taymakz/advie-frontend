export function RemoveEmptyProps(object) {
  for (const key in object) {
    if (object[key] === '' || object[key] == null)

      delete object[key]
  }
}

export function RangeNumber(start, end) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}
