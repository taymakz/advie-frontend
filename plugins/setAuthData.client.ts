import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export default defineNuxtPlugin(() => {
  const authStore = useAuthenticateStore()

  authStore.SetCurrentUserValue()
})
