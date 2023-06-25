import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ForgotPasswordTokenDTO } from '~/models/account/password/PasswordDTO'

export function UserForgotPasswordCheck(
  username: string,
): Promise<ApiResponse<null>> {
  return FetchApi('/user/forgot/password/check/', {
    method: 'POST',
    body: {
      username,
    },
  })
}

export function UserForgotPasswordOTP(
  username: string,
  otp: string,
): Promise<ApiResponse<ForgotPasswordTokenDTO>> {
  return FetchApi('/user/forgot/password/otp/', {
    method: 'POST',
    body: {
      username,
      otp,
    },
  })
}
export function UserResetPassword(
  username: string,
  token: string,
  password: string,
  confirm_password: string,
): Promise<ApiResponse<ForgotPasswordTokenDTO>> {
  return FetchApi('/user/forgot/password/reset/', {
    method: 'POST',
    body: {
      username,
      token,
      password,
      confirm_password,

    },
  })
}
