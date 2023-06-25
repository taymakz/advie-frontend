export interface ForgotPasswordTokenDTO {
  token: string

}

export enum ForgotPasswordSection {
  USERNAME = 'USERNAME',
  OTP = 'OTP',
  NEW_PASSWORD = 'NEW_PASSWORD',
}
