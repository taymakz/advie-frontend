export const emailRegex = /^\S+@\S+\.\S+$/
export const phoneRegex = /^(\+98|0)?9\d{9}$/
export const postalCodeRegex = /^\d{10}$/
export const nationalCodeRegex = /^\d{10}$/

export function validatePhoneNumber(phoneNumber: string): boolean {
  return phoneRegex.test(phoneNumber)
}

export function validateEmail(email: string): boolean {
  return emailRegex.test(email)
}

export function validateUsername(username: string): boolean {
  return phoneRegex.test(username) || emailRegex.test(username)
}

export function validatePostalCode(postalCode: string): boolean {
  return postalCodeRegex.test(postalCode)
}

export function validateNationalCode(nationalCode: string): boolean {
  if (!nationalCodeRegex.test(nationalCode))
    return false

  const check = Number.parseInt(nationalCode[9])
  let sum = 0

  for (let i = 0; i < 9; i++)
    sum += Number.parseInt(nationalCode[i]) * (10 - i)

  const remainder = sum % 11

  return (remainder < 2 && check === remainder) || (remainder >= 2 && check + remainder === 11)
}
