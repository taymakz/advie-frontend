export interface UserDetailDTO {
  id: number
  profile: string
  username: string
  first_name: string | null
  last_name: string | null
  email: string
  phone: string
  national_code: string
  has_password: boolean
  is_active: boolean
  is_superuser: boolean
  verified: boolean
}

export enum RequestOTPUsage {
  AUTHENTICATE = 'AUTHENTICATE',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY = 'VERIFY',
}
