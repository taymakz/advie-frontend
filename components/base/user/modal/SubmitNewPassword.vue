<script lang="ts" setup>
import * as Yup from 'yup'
import type { Ref } from 'vue'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { UserEditPassword } from '~/services/account/user.profile.service'
import {
  passwordHasLowercase,
  passwordHasNumber,
  passwordHasUppercase,
  passwordIsValidPasswordLength,
  validatePassword,
} from '~/utils/Validators'

const modelValue = defineModel()

const authStore = useAuthenticateStore()

const loading = ref(false)
const toast = useToast()

const formData = reactive({
  current_password: '',
  password: '',
  confirm_password: '',
})
const lowercaseValid = ref(false)
const uppercaseValid = ref(false)
const numberValid = ref(false)
const lengthValid = ref(false)
watch(() => formData.password, (newPassword) => {
  lowercaseValid.value = passwordHasLowercase(newPassword)
  uppercaseValid.value = passwordHasUppercase(newPassword)
  numberValid.value = passwordHasNumber(newPassword)
  lengthValid.value = passwordIsValidPasswordLength(newPassword)
})
const formSchema = Yup.object().shape({
  password: Yup
    .string().required().test('password', '', validatePassword),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password')],
    'کلمه های عبور یکسان نیستند',
  ),

})

async function editPassword(data: any, formEvent: any) {
  if (!formData.password || !validatePassword(formData.password))
    return
  if (formData.password !== formData.confirm_password)
    return

  loading.value = true
  const result = await UserEditPassword(formData)
  loading.value = false
  if (result.success) {
    modelValue.value = false
    formData.current_password = ''
    formData.password = ''
    formData.confirm_password = ''
    toast.add({ title: result.message, color: 'green' })
    localStorage.removeItem('authToken')
    const tokens = {
      refresh: result.data.refresh,
      access: result.data.access,
    }
    localStorage.setItem('authToken', JSON.stringify(tokens))
    await authStore.SetCurrentUserValue()
  }
  else {
    if (result.data.error_input_name) {
      formEvent.setFieldError(
        result.data.error_input_name,
        result.message,
      )
    }
    else {
      toast.add({ title: result.message, color: 'red' })
    }
  }
}

const getValidationClass: Ref<any> = computed(() => {
  const validCount = [lowercaseValid, uppercaseValid, numberValid, lengthValid].filter(ref => ref.value).length

  if (validCount === 0)
    return ['bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600']
  else if (validCount === 1)
    return ['bg-red-500', 'bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600']
  else if (validCount === 2)
    return ['bg-yellow-500', 'bg-yellow-500', 'bg-gray-200 dark:bg-gray-600', 'bg-gray-200 dark:bg-gray-600']
  else if (validCount === 3)
    return ['bg-sky-500', 'bg-sky-500', 'bg-sky-500', 'bg-gray-200 dark:bg-gray-600']
  else if (validCount === 4)
    return ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500']
})
</script>

<template>
  <UModal v-model="modelValue" :ui="{ width: 'max-w-lg' }">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-slate-600 dark:text-slate-300">
            <template v-if="authStore.currentUser?.has_password">
              تغییر کلمه عبور
            </template>
            <template v-else>
              ثبت کلمه عبور جدید
            </template>
          </h3>

          <div class="w-24">
            <UButton block size="lg" color="red" variant="outline" label="بستن" @click="modelValue = false" />
          </div>
        </div>
      </template>
      <Form
        v-slot="{ meta }" :validation-schema="formSchema"
        @submit="editPassword"
      >
        <!-- Current Password -->
        <div class="mb-4">
          <Field v-slot="{ field }" name="current_password">
            <base-form-input
              v-model="formData.current_password" :disabled="loading" focus label="کلمه عبور فعلی" ltr type="password"
              v-bind="field"
            />
          </Field>
        </div>
        <!-- New Password -->
        <div class="mb-4">
          <Field v-slot="{ field }" name="password">
            <base-form-input
              v-model="formData.password" :disabled="loading" label="کلمه عبور جدید" ltr type="password"
              v-bind="field"
            />
          </Field>
          <div>
            <div class="flex items-center gap-x-2 mb-4">
              <div class="w-full h-[3px] rounded-full " :class="getValidationClass[0]" />
              <div class="w-full h-[3px] rounded-full  " :class="getValidationClass[1]" />
              <div class="w-full h-[3px] rounded-full   " :class="getValidationClass[2]" />
              <div class="w-full h-[3px] rounded-full   " :class="getValidationClass[3]" />
            </div>
            <div>
              <ul class="text-xs md:text-sm text-slate-500 dark:text-slate-400 select-none list-disc px-4 space-y-2">
                <li v-show="!lengthValid">
                  <p>
                    حداقل 6 حرف
                  </p>
                </li>
                <li v-show="!lowercaseValid">
                  <p>
                    شامل عدد
                  </p>
                </li>
                <li v-show="!uppercaseValid">
                  <p>
                    شامل یک حرف بزرگ
                  </p>
                </li>
                <li v-show="!numberValid">
                  <p>
                    شامل یک حرف کوچک
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Confirm New Password -->
        <div class="mb-4">
          <Field v-slot="{ field }" name="confirm_password">
            <base-form-input
              v-model="formData.confirm_password" :disabled="loading" label="تکرار کلمه عبور جدید" ltr
              type="password"
              v-bind="field"
            />
          </Field>
        </div>
        <div class="flex justify-end">
          <div class="w-fit md:w-full">
            <UButton
              type="submit"
              block
              size="lg" color="sky"
              :label="authStore.currentUser?.has_password ? 'تغییر کلمه عبور' : 'ثبت کلمه عبور جدید'"
              :disabled="meta.valid === false"
              :loading="loading"
            />
          </div>
        </div>
      </Form>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
