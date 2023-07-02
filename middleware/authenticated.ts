import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthenticateStore()
  if (!authStore.isLogin)
    return navigateTo(`/auth/login?backUrl=${to.fullPath}`)
})
