export const emailRegex = /^\S+@\S+\.\S+$/
export const phoneRegex = /^(\+98|0)?9\d{9}$/
export function validatePhoneNumber(phoneNumber: string): boolean {
  return phoneRegex.test(phoneNumber)
}

export function validateEmail(email: string): boolean {
  return emailRegex.test(email)
}
export function validateUsername(username: string): boolean {
  return phoneRegex.test(username) || emailRegex.test(username)
}
