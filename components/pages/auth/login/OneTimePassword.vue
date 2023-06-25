<script setup lang="ts">
import * as Yup from 'yup'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'
import { UserOTPAuthentication } from '~/services/account/authenticate.service'

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

function goBack() {
  const previousSection: any = route.query.prevSec || AuthenticateSection.USERNAME
  emits('changeSection', previousSection)
  otp.value = ''
  loading.value = false
}

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
        کد تایید را وارد کنید
      </h1>
    </div>
    <!-- Form -->
    <div>
      <Form v-slot="{ meta, validate }" :validation-schema="otpSchema" @submit="loginUser">
        <base-form-input v-model="otp" focus type="text" name="otp" :disabled="loading" @focusout-input="validate" />

        <div class="flex flex-col gap-y-2 mb-4">
          <div>
            <button
              class="text-[14px] flex items-center py-1 px-2 " type="button" :disabled="timer.timerRunning"
              @click="requestNewOTP"
            >
              <template v-if="timer.timerRunning">
                <span class=" text-gray-500 font-iranyekanFanum"> ارسال مجدد پس از : {{ formattedTime }}</span>
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
            >
              <span>
                ورود با رمز عبور
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

<style>

</style>
