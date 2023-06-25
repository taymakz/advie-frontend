<script setup lang="ts">
import * as Yup from 'yup'

import { UserForgotPasswordCheck } from '~/services/account/password.service'
import { ForgotPasswordSection } from '~/models/account/password/PasswordDTO'

const emits = defineEmits(['changeSection', 'usernameChange'])
const username = ref('')
const loading = ref(false)
const toast = useToast()

watch(username, (newUsername) => {
  emits('usernameChange', newUsername)
})
const usernameSchema = Yup.object().shape({
  username: Yup
    .string().username(),
})

async function forgotPassword(data: any, formEvent: any) {
  loading.value = true
  if (!validateUsername(username.value)) {
    formEvent.setFieldError('username', 'شماره موبایل و یا ایمیل نامعتبر است')
    loading.value = false
    return
  }
  const result = await UserForgotPasswordCheck(username.value)
  loading.value = false

  if (result.success) {
    emits('changeSection', ForgotPasswordSection.OTP)

    toast.add({ title: result.message, color: 'green' })
  }
  else {
    formEvent.setFieldError('username', result.message)
  }
}

onMounted(() => {
  const usernameLocalStorage = localStorage.getItem('username')
  if (usernameLocalStorage) {
    username.value = usernameLocalStorage
    localStorage.removeItem('username')
  }
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-center text-lg text-slate-500 dark:text-slate-400">
        فراموشی کلمه عبور
      </h1>
    </div>
    <!-- Form -->
    <div class="mb-6">
      <Form v-slot="{ meta, validate }" :validation-schema="usernameSchema" @submit="forgotPassword">
        <base-form-input
          v-model="username" focus name="username" label="شماره موبایل یا ایمیل"
          :disabled="loading" @focusout-input="validate"
        />

        <div class="mb-4">
          <base-button
            type="submit"
            w-full
            :disabled="meta.valid === false || loading"
            :loading="loading"
            class="py-3.5"
          >
            بازیابی کلمه عبور
          </base-button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>
