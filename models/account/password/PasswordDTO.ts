export interface ForgotPasswordTokenDTO {
  token: string

}

export enum ForgotPasswordSection {
  USERNAME = 'USERNAME',
  OTP = 'OTP',
  NEW_PASSWORD = 'NEW_PASSWORD',
}

export interface ChangePasswordDTO {
  current_password: string
  password: string
  confirm_password: string
  refresh: string
}
