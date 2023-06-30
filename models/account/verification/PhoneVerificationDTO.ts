export interface PhoneVerificationDTO {
  section: PhoneVerificationSection

}

export enum PhoneVerificationSection {
  PHONE = 'PHONE',
  OTP = 'OTP',
}
