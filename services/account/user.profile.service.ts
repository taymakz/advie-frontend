import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ChangePasswordDTO } from '~/models/account/password/PasswordDTO'
import type { AuthenticateDTO } from '~/models/account/authenticate/AuthenticateDTO'

export function UserEditDetail(editModel: FormData): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/edit/detail/', {
    method: 'PUT',
    body: editModel,
  })
}

export function UserChangePassword(command: ChangePasswordDTO): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/edit/password/', {
    method: 'PUT',
    body: command,
  })
}

export function UserConfirmPhone(
  phone: string,
  otp: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/confirm/phone/', {
    method: 'POST',
    body: {
      phone,
      otp,
    },
  })
}
