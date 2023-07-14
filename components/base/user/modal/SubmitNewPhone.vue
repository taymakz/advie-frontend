<script setup lang="ts">
import type { Ref } from 'vue'
import * as Yup from 'yup'
import { PhoneVerificationSection } from '~/models/account/verification/PhoneVerificationDTO'
import { RequestOTP } from '~/services/account/user.service'
import { RequestOTPUsage } from '~/models/account/user/UserDTO'
import { UserEditPhoneConfirm, UserEditPhoneRequest } from '~/services/account/user.profile.service'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const emits = defineEmits(['loading'])
const modelValue = defineModel()
const authStore = useAuthenticateStore()
const isFormChanged = ref(false)
const section: Ref<PhoneVerificationSection> = ref(PhoneVerificationSection.PHONE)
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

async function requestNewOTP() {
  if (!formData.phone || !validatePhoneNumber(formData.phone))
    return
  if (formData.phone.length === 10)
    formData.phone = `0${formData.phone}`
  if (formData.phone === authStore.currentUser?.phone) {
    modelValue.value = false
    return
  }
  loading.value = true

  const result = await RequestOTP(formData.phone, RequestOTPUsage.VERIFY)
  loading.value = false
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    startTimer()
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
}

async function editPhoneRequest(data: any, formEvent: any) {
  if (!formData.phone || !validatePhoneNumber(formData.phone))
    return
  if (formData.phone.length === 10)
    formData.phone = `0${formData.phone}`
  if (formData.phone === authStore.currentUser?.phone) {
    modelValue.value = false
    return
  }
  if (!isFormChanged.value) {
    modelValue.value = false
    return
  }
  emits('loading', true)

  loading.value = true
  const result = await UserEditPhoneRequest(formData.phone, RequestOTPUsage.VERIFY)
  loading.value = false
  emits('loading', false)

  if (result.success) {
    toast.add({ title: result.message, color: 'green' })
    section.value = PhoneVerificationSection.OTP
    stopTimer()
    startTimer()
  }
  else {
    formEvent.setFieldError(
      'phone',
      result.message,
    )
  }
}

async function editPhoneConfirm(data: any, formEvent: any) {
  if (!formData.phone || !formData.otp)
    return
  loading.value = true
  try {
    const result = await UserEditPhoneConfirm(formData.phone, formData.otp)
    if (result.success) {
      toast.add({ title: result.message, color: 'green' })
      modelValue.value = false
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
  <UModal v-model="modelValue" :ui="{ width: 'max-w-lg' }">
    <template v-if="section === PhoneVerificationSection.PHONE">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-slate-600 dark:text-slate-300">
              <template v-if="authStore.currentUser?.phone">
                ویرایش شماره موبایل
              </template>
              <template v-else>
                ثبت شماره موبایل جدید
              </template>
            </h3>
            <div class="w-24">
              <UButton block size="lg" color="red" label="بستن" @click="modelValue = false" />
            </div>
          </div>
        </template>
        <Form
          v-slot="{ meta }" :validation-schema="phoneSchema" :initial-values="formData"
          @submit="editPhoneRequest"
        >
          <Field v-slot="{ field }" name="phone">
            <base-form-input
              v-model="formData.phone" ltr v-bind="field" type="text" focus label="شماره موبایل"
              :disabled="loading"
            />
          </Field>

          <div class="flex justify-end">
            <div class="w-fit md:w-full">
              <UButton
                type="submit"
                block
                size="lg" color="sky" label="ارسال کد تایید" :disabled="meta.valid === false"
                :loading="loading"
              />
            </div>
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
            <div class="w-24">
              <UButton
                block size="lg" color="sky" label="برگشت"
                @click="section = PhoneVerificationSection.PHONE"
              />
            </div>
          </div>
        </template>
        <Form v-slot="{ meta }" :validation-schema="otpSchema" @submit="editPhoneConfirm">
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
          <div class="flex justify-end">
            <div class="w-fit md:w-full">
              <UButton
                type="submit"
                block
                size="lg" color="sky" label="تایید" :disabled="meta.valid === false"
                :loading="loading"
              />
            </div>
          </div>
        </Form>
      </UCard>
    </template>
  </UModal>
</template>

<style scoped>

</style>
