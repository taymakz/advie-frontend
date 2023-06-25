import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthenticateStore()

  authStore.SetCurrentUserValue()
})
