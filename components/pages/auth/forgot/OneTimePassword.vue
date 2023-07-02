<script setup lang="ts">
import * as Yup from 'yup'

import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'
import { ForgotPasswordSection } from '~/models/account/password/PasswordDTO'
import { UserForgotPasswordOTP } from '~/services/account/user.password.service'

const props = defineProps({
  username: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['changeSection'])
const otp = ref('')
const loading = ref(false)
const toast = useToast()
const route = useRoute()

const otpSchema = Yup.object().shape({
  otp: Yup.string().required(),
})

async function confirmOTP(data: any, formEvent: any) {
  loading.value = true
  try {
    const result = await UserForgotPasswordOTP(props.username, otp.value)
    if (result.success) {
      localStorage.removeItem('forgotPasswordToken')
      localStorage.setItem('forgotPasswordToken', JSON.stringify(result.data.token))
      emits('changeSection', ForgotPasswordSection.NEW_PASSWORD)
    }
    else {
      formEvent.setFieldError(
        'otp',
        result.message,
      )
    }
  }
  catch (error) {
  }
  loading.value = false
}

async function requestNewOTP() {
  loading.value = true
  if (!validateUsername(props.username))
    return
  const result = await RequestOTP(props.username, RequestOTPUsage.RESET_PASSWORD)
  loading.value = false
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    startTimer()
  }
  else {
    emits('changeSection', ForgotPasswordSection.USERNAME)
  }
}

/* Timer Section */
onMounted(() => {
  startTimer()
})

const timerSetting = reactive({
  minutes: 3,
  seconds: 0,
})

const timer = reactive({
  timerRunning: false,
  minutes: timerSetting.minutes,
  seconds: timerSetting.seconds,
  timerId: null as number | null | any,
})

const formattedTime = computed(() => {
  const min = String(timer.minutes).padStart(2, '0')
  const sec = String(timer.seconds).padStart(2, '0')
  return `${sec} : ${min}`
})

function resetTimer() {
  timer.minutes = timerSetting.minutes
  timer.seconds = timerSetting.seconds
}

function startTimer() {
  if (!timer.timerRunning) {
    resetTimer()
    timer.timerRunning = true
    timer.timerId = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        stopTimer()
        return
      }
      if (timer.seconds === 0) {
        timer.minutes--
        timer.seconds = 59
      }
      else {
        timer.seconds--
      }
    }, 1000)
  }
}

function stopTimer() {
  timer.timerRunning = false
  clearInterval(timer.timerId)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-right text-slate-500 dark:text-slate-400">
        کد تایید را وارد کنید
      </h1>
    </div>
    <!-- Form -->
    <div>
      <Form v-slot="{ validate }" :validation-schema="otpSchema" @submit="confirmOTP">
        <Field v-slot="{ field }" name="otp">
          <base-form-input
            v-model="otp" v-bind="field" focus type="text" :disabled="loading" ltr
            @focusout-input="validate"
          />
        </Field>
        <div class="flex flex-col gap-y-2 mb-4">
          <div>
            <button
              class="text-[14px] flex items-center py-1 px-2 " type="button" :disabled="timer.timerRunning"
              @click="requestNewOTP"
            >
              <template v-if="timer.timerRunning">
                <span class=" text-gray-500 "> ارسال مجدد پس از : {{ formattedTime }}</span>
              </template>
              <template v-else>
                <span class="text-sky-600"> ارسال مجدد کد تایید</span>
                <Icon name="ic:outline-chevron-left" size="18" class="!text-sky-600" />
              </template>
            </button>
          </div>
        </div>
        <div class="mb-4">
          <base-button
            type="submit"
            w-full
            :disabled="loading"
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

<style>

</style>
