import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ChangePasswordDTO, ChangePasswordResultDTO } from '~/models/account/password/PasswordDTO'

import type { AuthenticateDTO } from '~/models/account/authenticate/AuthenticateDTO'

export function UserEditDetail(editModel: FormData): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/edit/detail/', {
    method: 'PUT',
    body: editModel,
  })
}

export function UserEditPassword(command: ChangePasswordDTO): Promise<ApiResponse<ChangePasswordResultDTO>> {
  return FetchApi('/user/edit/password/', {
    method: 'PUT',
    body: command,
  })
}

export function UserEditPhoneRequest(
  phone: string,
  otp_usage: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/edit/phone/request/', {
    method: 'POST',
    body: {
      phone,
      otp_usage,
    },
  })
}

export function UserEditPhoneConfirm(
  phone: string,
  otp: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/edit/phone/confirm/', {

    method: 'POST',
    body: {
      phone,
      otp,
    },
  })
}

export function UserEditEmailRequest(
  email: string,
  otp_usage: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/edit/email/request/', {
    method: 'POST',
    body: {
      email,
      otp_usage,
    },
  })
}

export function UserEditEmailConfirm(
  email: string,
  otp: string,
): Promise<ApiResponse<AuthenticateDTO>> {
  return FetchApi('/user/edit/email/confirm/', {

    method: 'POST',
    body: {
      email,
      otp,
    },
  })
}
