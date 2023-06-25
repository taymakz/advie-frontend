import type { ApiResponse } from '~/models/api/ApiResponse'
import type { UserDetailDTO } from '~/models/account/user/UserDTO'

export function RequestOTP(
  to: string,
  otp_usage: string,
): Promise<ApiResponse<null>> {
  return FetchApi('/user/request/otp/', {
    method: 'POST',
    body: {
      to,
      otp_usage,
    },
  })
}

export function GetCurrentUser(): Promise<ApiResponse<UserDetailDTO>> {
  return FetchApi('user/request/current/')
}

export function LogoutUser(
  refresh: string,
): Promise<ApiResponse<null>> {
  return FetchApi('/user/logout/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refresh,
    }),
  })
}
