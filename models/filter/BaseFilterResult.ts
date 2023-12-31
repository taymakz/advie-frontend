export interface baseFilterResult<T> {
  entity_count: number
  current_page: number
  page_count: number
  start_page: number
  take: number
  has_next: boolean
  has_previous: boolean
  data: T[]
}
