import type { ApiResponse } from '~/models/api/ApiResponse'
import type { UserNotificationDTO } from '~/models/account/user/UserNotificationDTO'

export function GetUserNotification(): Promise<ApiResponse<UserNotificationDTO[]>> {
  return FetchApi('/user/notification/list/')
}
