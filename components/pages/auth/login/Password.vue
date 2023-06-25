<script setup lang="ts">
import * as Yup from 'yup'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'
import { UserPasswordAuthentication } from '~/services/account/authenticate.service'

import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'

const props = defineProps({
  username: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['changeSection', 'canLoginWithPassword'])
const toast = useToast()
const router = useRouter()
const route = useRoute()
const authStore = useAuthenticateStore()

const password = ref('')
const loading = ref(false)

const passwordSchema = Yup.object().shape({
  password: Yup.string().required(),
})

function goBack() {
  emits('changeSection', AuthenticateSection.USERNAME)
  password.value = ''
  loading.value = false
}

async function redirectToOTP() {
  loading.value = true
  const result = await RequestOTP(props.username, RequestOTPUsage.AUTHENTICATE)
  loading.value = false

  if (result.success) {
    emits('changeSection', AuthenticateSection.OTP)
    emits('canLoginWithPassword', true)
    password.value = ''

    toast.add({ title: result.message, color: 'green' })
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
}

function redirectToForgot() {
  localStorage.setItem('username', props.username)
  router.push({
    path: '/auth/forgot/',
  })
}

async function loginUser(data: any, formEvent: any) {
  loading.value = true
  try {
    const result = await UserPasswordAuthentication(props.username, password.value)
    if (result.success) {
      toast.add({ title: result.message, color: 'green' })

      localStorage.removeItem('authToken')
      localStorage.setItem('authToken', JSON.stringify(result.data))
      await authStore.SetCurrentUserValue()
      // basketStore.SyncRemoteBasket()

      const backUrl: any = route.query.backUrl || '/'

      return await router.push(backUrl)
    }
    else {
      formEvent.setFieldError(
        'password',
        result.message,
      )
    }
  }
  catch (error) {
  }
  loading.value = false
}
</script>

<template>
  <div class="relative">
    <div class="fixed -top-2 -right-2">
      <div
        class="group bg-gray-200 dark:bg-gray-800 hover:bg-sky-600 hover:dark:bg-sky-600 transition-colors duration-150  p-1 rounded-full cursor-pointer flex items-center justify-center"
        @click="goBack"
      >
        <Icon name="ion:arrow-forward-outline" size="25" class="group-hover:text-slate-100" />
      </div>
    </div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-right text-slate-500 dark:text-slate-400">
        رمز عبور را وارد کنید
      </h1>
    </div>
    <!-- Form -->
    <div>
      <Form v-slot="{ meta, validate }" :validation-schema="passwordSchema" @submit="loginUser">
        <base-form-input
          v-model="password" focus type="password" name="password" :disabled="loading"
          @focusout-input="validate"
        />
        <div class="flex flex-col gap-y-2 mb-4">
          <div>
            <button
              type="button"
              :disabled="loading"
              class="flex items-center py-1 px-2 text-[14px] text-sky-600"
              @click="redirectToOTP"
            >
              <span>
                ورود با رمز یک بار مصرف
              </span>
              <Icon name="ic:outline-chevron-left" size="18" class="!text-sky-600" />
            </button>
          </div>
          <div>
            <button
              type="button"
              :disabled="loading"
              class="flex items-center py-1 px-2 text-[14px] text-sky-600"
              @click="redirectToForgot"
            >
              <span>
                فراموشی رمز عبور
              </span>
              <Icon name="ic:outline-chevron-left" size="18" class="!text-sky-600" />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <base-button
            type="submit"
            w-full
            :disabled="meta.valid === false || loading"
            :loading="loading"
            class="py-3.5"
          >
            تایید
          </base-button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>
