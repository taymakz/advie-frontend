export interface CheckoutResultDTO {
  transaction_status: TransactionStatus
  transaction_id: number
  order_slug: number
  payment_date: Date
  repayment_date_expire: Date

}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
