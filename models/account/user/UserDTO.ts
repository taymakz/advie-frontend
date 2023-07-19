export interface UserDetailDTO {
  id: number
  profile: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  phone: string
  national_code: string
  has_password: boolean
  is_active: boolean
  is_superuser: boolean
  verified: boolean
  notification_count: number
}

export enum RequestOTPUsage {
  AUTHENTICATE = 'AUTHENTICATE',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY = 'VERIFY',
}
