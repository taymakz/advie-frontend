<script setup lang="ts">
import * as Yup from 'yup'
import { UserAuthenticateCheck } from '~/services/account/user.authenticate.service'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'

const emits = defineEmits(['changeSection', 'usernameChange'])
const username = ref('')
const loading = ref(false)
const toast = useToast()

watch(username, (newUsername) => {
  emits('usernameChange', newUsername)
})
const usernameSchema = Yup.object().shape({
  username: Yup
    .string().required().test('username', 'شماره موبایل و یا ایمیل نامعتبر است', validateUsername),
})

async function authenticateUser(data: any, formEvent: any) {
  loading.value = true
  if (!validateUsername(username.value)) {
    formEvent.setFieldError('username', 'شماره موبایل و یا ایمیل نامعتبر است')
    loading.value = false
    return
  }
  const result = await UserAuthenticateCheck(username.value)
  loading.value = false

  if (result.success) {
    emits('changeSection', result.data.section)
    if (result.data.section === AuthenticateSection.OTP)
      toast.add({ title: result.message, color: 'green' })
  }
  else {
    formEvent.setFieldError('username', result.message)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-center text-lg text-slate-500 dark:text-slate-400">
        ورود | ثبت نام
      </h1>
    </div>
    <!-- Form -->
    <div class="mb-6">
      <Form v-slot="{ meta, validate }" :validation-schema="usernameSchema" @submit="authenticateUser">
        <Field v-slot="{ field }" name="username">
          <base-form-input
            v-model="username" v-bind="field" type="text" focus label="شماره موبایل یا ایمیل"
            :disabled="loading" ltr @focusout-input="validate"
          />
        </Field>

        <div class="mb-4">
          <UButton
            type="submit" block label="ورود" color="sky" :loading="loading"
            :disabled="meta.valid === false || loading" size="xl"
          />
        </div>
      </Form>
    </div>
    <div class="mb-8">
      <p class="text-xs text-center text-slate-500 dark:text-slate-400">
        با ورود به لیون کامپیوتر،

        <nuxt-link to="/" class="text-sky-500 dark:text-sky-400">
          کلیه قوانین و مقررات
        </nuxt-link>

        را می‌پذیرم
      </p>
    </div>
  </div>
</template>
