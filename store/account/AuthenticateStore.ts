import { defineStore } from 'pinia'

import type { AuthenticateDTO } from '~/models/account/authenticate/AuthenticateDTO'

import { GetCurrentUser, LogoutUser } from '~/services/account/user.service'
import type { UserDetailDTO } from '~/models/account/user/UserDTO'

export const useAuthenticateStore = defineStore('authenticate', () => {
  const authenticateResult: Ref<AuthenticateDTO | null> = ref(null)
  const currentUser: Ref<UserDetailDTO | null> = ref(null)

  const loading = ref(false)
  const isLogin = computed(() => authenticateResult.value != null)
  const router = useRouter()
  const toast = useToast()

  const SetCurrentUserValue = async () => {
    const localStorageData = localStorage.getItem('authToken')
    if (!localStorageData)
      return

    authenticateResult.value = JSON.parse(localStorageData)

    loading.value = true
    const result = await GetCurrentUser()
    if (result.success) {
      currentUser.value = result.data
    }
    else {
      authenticateResult.value = null
      localStorage.removeItem('authToken')
    }
    loading.value = false
  }
  const Logout = async () => {
    const authData = authenticateResult.value
    if (!authData)
      return

    loading.value = true
    const result = await LogoutUser(authData.refresh)

    if (result.success) {
      toast.add({ title: result.message, color: 'green' })

      // Clear the login data and user data from the store and local storage
      authenticateResult.value = null
      currentUser.value = null
      localStorage.removeItem('authToken')
      // Redirect to the login page with the current URL as the backUrl parameter
      await router.push({ path: '/auth/login', query: { backUrl: router.currentRoute.value.fullPath || '/' } })
    }
    else {
      toast.add({ title: result.message, color: 'red' })
    }
    loading.value = false
  }
  const RefreshToken = async () => {
    if (!authenticateResult.value?.refresh) {
      authenticateResult.value = null

      currentUser.value = null
      localStorage.removeItem('authToken')
      return
    }
    const response = await RefreshUserToken(authenticateResult.value.refresh)
    const data = await response.json()

    if (response.status === 200) {
      authenticateResult.value = {
        refresh: authenticateResult.value.refresh,
        access: data.access,
      }
      localStorage.removeItem('authToken')
      localStorage.setItem('authToken', JSON.stringify(authenticateResult.value))
    }
    else if (response.statusText === 'Unauthorized' && response.status === 401) {
      authenticateResult.value = null
      currentUser.value = null

      localStorage.removeItem('authToken')
    }
  }

  return { loading, authenticateResult, currentUser, SetCurrentUserValue, isLogin, Logout, RefreshToken }
})
