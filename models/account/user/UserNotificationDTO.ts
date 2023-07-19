export interface UserNotificationDTO {
  id: number
  order_items: product[]
  product: product
  template: UserNotificationTemplate
  title: string
  message: string
  link: string
  date_created: Date
}

interface product {
  image: string
  title_ir: string
  url: string
}

export enum UserNotificationTemplate {
  ORDER = 'ORDER',
  REFUND = 'REFUND',
  COMMENT = 'COMMENT',
}
