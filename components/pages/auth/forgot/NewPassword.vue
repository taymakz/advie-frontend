<script setup lang="ts">
import * as Yup from 'yup'
import type { Ref } from 'vue/dist/vue'
import { ForgotPasswordSection } from '~/models/account/password/PasswordDTO'
import { UserResetPassword } from '~/services/account/user.password.service'
import {
  passwordHasLowercase,
  passwordHasNumber,
  passwordHasUppercase,
  passwordIsValidPasswordLength,
  validatePassword,
} from '~/utils/Validators'

const props = defineProps({
  username: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['changeSection'])
const loading = ref(false)
const toast = useToast()
const router = useRouter()

const formData = reactive({
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

async function resetPassword(data: any, formEvent: any) {
  loading.value = true
  try {
    const resetPasswordToken = localStorage.getItem('forgotPasswordToken')

    if (!resetPasswordToken)
      return emits('changeSection', ForgotPasswordSection.USERNAME)
    const result = await UserResetPassword(props.username, resetPasswordToken, formData.password, formData.confirm_password)
    if (result.success) {
      localStorage.removeItem('forgotPasswordToken')
      toast.add({ title: result.message, color: 'green' })

      return await router.push('/auth/login/')
    }
    else {
      formEvent.setFieldError(
        'confirm_password',
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
    <div class="mb-10">
      <h1 class="text-center text-lg text-slate-500 dark:text-slate-400">
        تغییر کلمه عبور
      </h1>
    </div>
    <!-- Form -->
    <div class="mb-6">
      <Form v-slot="{ meta }" :validation-schema="formSchema" @submit="resetPassword">
        <!-- New Password -->
        <div class="mb-4">
          <Field v-slot="{ field }" name="password">
            <base-form-input
              v-model="formData.password" :disabled="loading" focus label="کلمه عبور جدید" ltr type="password"
              v-bind="field"
            />
          </Field>
          <div class="mb-5">
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
              v-model="formData.confirm_password" :auto-complete="false" :disabled="loading"
              label="تکرار کلمه عبور جدید" ltr
              type="password"
              v-bind="field"
            />
          </Field>
        </div>

        <div>
          <UButton
            type="submit" block label="تایید" color="sky" :auto-complete="false"
            :disabled="meta.valid === false || loading"
            :loading="loading" size="xl"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>
