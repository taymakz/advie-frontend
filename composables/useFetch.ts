import type { ApiResponse } from '~/models/api/ApiResponse'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export async function FetchApi<T>(url: string, config: any = {}): Promise<ApiResponse<T>> {
  const runtimeConfig = useRuntimeConfig()
  config = {
    method: 'GET',
    baseURL: `${runtimeConfig.public.baseApi}/api`,
    ...config,
  }
  const authStore = useAuthenticateStore()

  if (authStore.authenticateResult) {
    config.headers = {
      Authorization: `Bearer ${authStore.authenticateResult.access}`,
    }
  }

  try {
    return await $fetch<ApiResponse<T>>(url, config)
  }
  catch (error: any) {
    if (error.status === 401 && authStore.authenticateResult) {
      await authStore.RefreshToken()
      if (authStore.authenticateResult) {
        config.headers = {
          Authorization: `Bearer ${authStore.authenticateResult.access}`,
        }
      }

      try {
        return await $fetch<ApiResponse<T>>(url, config)
      }
      catch (newError: any) {
        if (newError.status === 401 && authStore.authenticateResult) {
          const router = useRouter()
          if (!router.currentRoute.value.fullPath.includes('/auth/login')) {
            await router.push({
              path: '/auth/login/',
              query: { backUrl: router.currentRoute.value.fullPath || '/' },
            })
          }

          return {
            success: false,
            status: newError.response?.status,
            message: 'لطفا مجددا وارد حساب خود شوید',
            data: null,
          } as ApiResponse<T>
        }
        return {
          success: false,
          status: newError.response?.status,
          message: 'مشکلی در عملیات رخ داده',
          data: null,
        } as ApiResponse<T>
      }
    }
    else {
      return {
        success: false,
        status: error.response?.status,
        message: 'مشکلی در عملیات رخ داده',
        data: null,
      } as ApiResponse<T>
    }
  }
}

export function RefreshUserToken(refresh: string): Promise<Response> {
  return fetch(`${useRuntimeConfig().public.baseApi}/api/user/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refresh,
    }),
  })
}
