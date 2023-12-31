<script setup lang="ts">
import * as Yup from 'yup'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'
import { UserPasswordAuthentication } from '~/services/account/user.authenticate.service'

import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'
import { useBasketStore } from '~/store/shop/BasketStore'

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
const basketStore = useBasketStore()

const password = ref('')
const loading = ref(false)

const passwordSchema = Yup.object().shape({
  password: Yup.string().required(),
})

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
      await basketStore.SyncRemoteBasket()

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
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-right text-slate-500 dark:text-slate-400">
        رمز عبور را وارد کنید
      </h1>
    </div>
    <!-- Form -->
    <div>
      <Form v-slot="{ meta, validate }" :validation-schema="passwordSchema" @submit="loginUser">
        <Field v-slot="{ field }" name="password">
          <base-form-input
            v-model="password" focus type="password" v-bind="field" :disabled="loading"
            ltr @focusout-input="validate"
          />
        </Field>
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
          <UButton
            type="submit" block label="ورود" color="sky" :loading="loading"
            :disabled="meta.valid === false || loading" size="xl"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>
