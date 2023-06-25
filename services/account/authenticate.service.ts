import type { ApiResponse } from '~/models/api/ApiResponse'
import type { AuthenticateCheckDTO, AuthenticateDTO } from '~/models/account/authenticate/AuthenticateDTO'

export function UserAuthenticateCheck(
  username: string,
): Promise<ApiResponse<AuthenticateCheckDTO>> {
  return FetchApi('/user/authenticate/check/', {
    method: 'POST',
    body: {
      username,
    },
  })
}

export function UserPasswordAuthentication(
  username: string,
  password: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/authenticate/password/', {
    method: 'POST',
    body: {
      username,
      password,
    },
  })
}

export function UserOTPAuthentication(
  username: string,
  otp: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/authenticate/otp/', {
    method: 'POST',
    body: {
      username,
      otp,
    },
  })
}
