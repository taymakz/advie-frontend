<script setup lang="ts">
import * as Yup from 'yup'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'
import { UserOTPAuthentication } from '~/services/account/user.authenticate.service'

import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'

const props = defineProps({
  canLoginWithPassword: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['changeSection'])
const otp = ref('')
const loading = ref(false)
const toast = useToast()
const router = useRouter()
const route = useRoute()
const authStore = useAuthenticateStore()

const otpSchema = Yup.object().shape({
  otp: Yup.string().required(),
})

async function loginUser(data: any, formEvent: any) {
  loading.value = true
  try {
    const result = await UserOTPAuthentication(props.username, otp.value)
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
  const result = await RequestOTP(props.username, RequestOTPUsage.AUTHENTICATE)
  loading.value = false
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    startTimer()
  }
  else {
    emits('changeSection', AuthenticateSection.USERNAME)
  }
}

async function redirectToPassword() {
  emits('changeSection', AuthenticateSection.PASSWORD)
  otp.value = ''
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
      <Form v-slot="{ meta, validate }" :validation-schema="otpSchema" @submit="loginUser">
        <Field v-slot="{ field }" name="otp">
          <base-form-input
            v-model="otp" focus type="text" v-bind="field" :disabled="loading"
            ltr @focusout-input="validate"
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
          <div v-if="canLoginWithPassword">
            <button
              :disabled="loading"
              class="flex items-center py-1 px-2 text-[14px] text-sky-600"
              @click="redirectToPassword"
            >
              <span>
                ورود با رمز عبور
              </span>
              <Icon name="ic:outline-chevron-left" size="18" class="!text-sky-600" />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <UButton
            type="submit" block label="تایید" color="sky" :loading="loading"
            :disabled="meta.valid === false || loading" size="xl"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<style>

</style>
