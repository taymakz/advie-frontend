import type { ApiResponse } from '~/models/api/ApiResponse'
import type { AddressCreateDTO, AddressDetailDTO, AddressEditDTO } from '~/models/account/user/AddressDTO'

export function GetAddressList(): Promise<ApiResponse<AddressDetailDTO[]>> {
  return FetchApi('/user/address/')
}

export function UserCreateAddress(command: AddressCreateDTO): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/address/', {
    method: 'POST',
    body: command,
  })
}

export function UserEditAddress(command: AddressEditDTO): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/address/', {
    method: 'PUT',
    body: command,
  })
}

export function UserRemoveAddress(id: number): Promise<ApiResponse<undefined>> {
  return FetchApi('/user/address/', {
    method: 'DELETE',
    body: {
      id,
    },
  })
}

export function UserGetAddressById(id: number): Promise<ApiResponse<AddressDetailDTO>> {
  return FetchApi(`/user/address/get/${id}/`)
}
