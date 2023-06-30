export interface AddressDetailDTO {
  id: number
  receiver_province: string
  receiver_city: string
  receiver_postal_code: string
  receiver_address: string
  receiver_phone: string
  receiver_name: string
  receiver_family: string
  receiver_national_code: string
}

export interface AddressCreateDTO {
  receiver_province: string
  receiver_city: string
  receiver_postal_code: string
  receiver_address: string
  receiver_phone: string
  receiver_name: string
  receiver_family: string
  receiver_national_code: string
}

export interface AddressEditDTO {
  id: number
  receiver_province: string
  receiver_city: string
  receiver_postal_code: string
  receiver_address: string
  receiver_phone: string
  receiver_name: string
  receiver_family: string
  receiver_national_code: string
}
