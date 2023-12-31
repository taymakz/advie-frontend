import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export default defineNuxtRouteMiddleware(async () => {
  if (process.server)
    return
  const authStore = await useAuthenticateStore()
  if (authStore.isLogin)
    return navigateTo('/')
})
