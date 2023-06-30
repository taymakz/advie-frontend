<script setup lang="ts">
import * as Yup from 'yup'
import type { Ref } from 'vue'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'
import { PhoneVerificationSection } from '~/models/account/verification/PhoneVerificationDTO'
import { UserConfirmPhone } from '~/services/account/user.profile.service'

const authStore = useAuthenticateStore()
const isFormChanged = ref(false)
const section: Ref<PhoneVerificationSection> = ref(PhoneVerificationSection.PHONE)

const isOpenModal = ref(false)
const loading = ref(false)
const toast = useToast()
const phoneSchema = Yup.object().shape({
  phone: Yup
    .string().required().test('phone', 'شماره موبایل نامعتبر است', validatePhoneNumber),
})
const otpSchema = Yup.object().shape({
  otp: Yup
    .string().required(),
})
const formData = reactive({
  phone: authStore.currentUser?.phone,
  otp: '',

})
watch(formData, () => {
  isFormChanged.value = true
})

async function requestOTP() {
  if (!formData.phone || !validatePhoneNumber(formData.phone))
    return
  if (formData.phone.length === 10)
    formData.phone = `0${formData.phone}`
  if (formData.phone === authStore.currentUser?.phone) {
    isOpenModal.value = false
    return
  }
  if (!isFormChanged.value) {
    isOpenModal.value = false
    return
  }

  loading.value = true
  const result = await RequestOTP(formData.phone, RequestOTPUsage.VERIFY)
  loading.value = false
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })
    section.value = PhoneVerificationSection.OTP
    stopTimer()
    startTimer()
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
}

async function confirmPhone(data: any, formEvent: any) {
  if (!formData.phone || !formData.otp)
    return
  loading.value = true
  try {
    const result = await UserConfirmPhone(formData.phone, formData.otp)
    if (result.success) {
      toast.add({ title: result.message, color: 'green' })
      isOpenModal.value = false
      section.value = PhoneVerificationSection.PHONE
      formData.otp = ''
      await authStore.SetCurrentUserValue()
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

/* Timer Section */

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
    <div
      class="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer select-none"
      @click="isOpenModal = true"
    >
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
          <h4 class="text-slate-500 dark:text-slate-400">
            شماره موبایل
          </h4>
          <div v-if="!authStore.currentUser?.phone">
            <BaseBeutyPing />
          </div>
        </div>
        <p class="text-slate-600 dark:text-slate-300">
          {{ authStore.currentUser?.phone }}
        </p>
      </div>
      <div>
        <Icon
          v-if="authStore.currentUser?.phone" name="ic:baseline-mode-edit" size="24"
          class="text-sky-500 dark:text-sky-400"
        />
        <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
      </div>
    </div>
    <UModal v-model="isOpenModal" :ui="{ width: 'max-w-lg' }">
      <template v-if="section === PhoneVerificationSection.PHONE">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-slate-600 dark:text-slate-300">
                <template v-if="authStore.currentUser?.phone">
                  ویرایش شماره موبایل
                </template>
                <template v-else>
                  ثبت شماره موبایل
                </template>
              </h3>
              <div>
                <base-button class="py-2 px-4 w-24" theme="rose" @click="isOpenModal = false">
                  بستن
                </base-button>
              </div>
            </div>
          </template>
          <Form v-slot="{ meta }" :validation-schema="phoneSchema" :initial-values="formData" @submit="requestOTP">
            <Field v-slot="{ field }" name="phone">
              <base-form-input
                v-model="formData.phone" ltr v-bind="field" type="text" focus label="شماره موبایل"
                :disabled="loading"
              />
            </Field>

            <div class="flex justify-end">
              <base-button
                type="submit"

                class="py-2 px-4 md:w-full " theme="sky" :disabled="meta.valid === false" :loading="loading"
              >
                ارسال کد تایید
              </base-button>
            </div>
          </Form>
        </UCard>
      </template>
      <template v-else-if="section === PhoneVerificationSection.OTP">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-slate-600 dark:text-slate-300">
                تایید شماره موبایل
              </h3>
              <div>
                <base-button class="py-2 px-4 w-24" theme="sky" @click="section = PhoneVerificationSection.PHONE">
                  برگشت
                </base-button>
              </div>
            </div>
          </template>
          <Form v-slot="{ meta }" :validation-schema="otpSchema" @submit="confirmPhone">
            <Field v-slot="{ field }" name="otp">
              <base-form-input
                v-model="formData.otp" ltr v-bind="field" type="text" focus label="کد تایید"
                :disabled="loading"
              />
            </Field>
            <div class="flex flex-col gap-y-2 mb-4">
              <div>
                <button
                  class="text-[14px] flex items-center py-1 px-2 " type="button" :disabled="timer.timerRunning"
                  @click="requestOTP"
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
            <div class="flex justify-end">
              <base-button
                type="submit"

                class="py-2 px-4 md:w-full " theme="sky" :disabled="meta.valid === false" :loading="loading"
              >
                تایید
              </base-button>
            </div>
          </Form>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<style scoped>

</style>
