export function truncatedText(text = '', truncate_number: number): string {
  if (text.length >= truncate_number)
    return `${text.slice(0, truncate_number)} ...`
  else
    return text
}
