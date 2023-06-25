<template>
  <div class="relative">
    <div class="fixed -top-2 -right-2">
      <div @click="goBack"
           class="group bg-gray-200 dark:bg-gray-800 hover:bg-sky-600 hover:dark:bg-sky-600 transition-colors duration-150  p-1 rounded-full cursor-pointer flex items-center justify-center">
        <Icon name="ion:arrow-forward-outline" size="25" class="group-hover:text-slate-100"/>
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


      <Form @submit="confirmOTP" v-slot="{ meta,validate }" :validation-schema="otpSchema">


        <base-form-input focus type="text" name="otp" v-model="otp" :disabled="loading" @focusoutInput="validate"/>

        <div class="flex flex-col gap-y-2 mb-4">
          <div>

            <button class="text-[14px] flex items-center py-1 px-2 " type="button" @click="requestNewOTP"
                    :disabled="timer.timerRunning">
              <template v-if="timer.timerRunning">
                <span class=" text-gray-500 font-iranyekanFanum"> ارسال مجدد پس از : {{ formattedTime }}</span>
              </template>
              <template v-else>
                <span class="text-sky-600"> ارسال مجدد کد تایید</span>
                <Icon name="ic:outline-chevron-left" size="18" class="!text-sky-600"/>
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

<script setup lang="ts">
import * as Yup from "yup";

import {useAuthenticateStore} from "~/store/account/AuthenticateStore";
import {RequestOTP} from "~/services/account/user.service";
import {RequestOTPUsage} from "~/models/account/user/UserDTO";
import {ForgotPasswordSection} from "~/models/account/password/PasswordDTO";
import {UserForgotPasswordOTP} from "~/services/account/password.service";

const otp = ref("")
const loading = ref(false)
const toast = useToast();
const router = useRouter();
const route = useRoute();


const emits = defineEmits(['changeSection'])

const otpSchema = Yup.object().shape({
  otp: Yup.string().required(),
})

const goBack = () => {
  const previousSection: any = route.query.prevSec || ForgotPasswordSection.USERNAME
  emits('changeSection', previousSection)
  otp.value = ""
  loading.value = false
}

const props = defineProps({
  username: {
    type: String,
    default: ""
  }
})
const confirmOTP = async (data: any, formEvent: any) => {
  loading.value = true;
  try {
    const result = await UserForgotPasswordOTP(props.username, otp.value);
    if (result.success) {

      localStorage.removeItem("forgotPasswordToken");
      localStorage.setItem("forgotPasswordToken", JSON.stringify(result.data.token));
  emits('changeSection', ForgotPasswordSection.NEW_PASSWORD)


    } else {
      formEvent.setFieldError(
          "otp",
          result.message
      );


    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
};
const requestNewOTP = async () => {
  loading.value = true
  if (!validateUsername(props.username)) return
  const result = await RequestOTP(props.username, RequestOTPUsage.RESET_PASSWORD);
  loading.value = false
  if (result.success) {
    toast.add({title: result.message, color: 'green'})

    startTimer()

  } else {
    emits('changeSection', ForgotPasswordSection.USERNAME)

  }
};

/* Timer Section */
onMounted(() => {
  startTimer()
})

const timerSetting = reactive({
  minutes: 3,
  seconds: 0,
});

const timer = reactive({
  timerRunning: false,
  minutes: timerSetting.minutes,
  seconds: timerSetting.seconds,
  timerId: null as number | null | any,
});

const formattedTime = computed(() => {
  const min = String(timer.minutes).padStart(2, '0');
  const sec = String(timer.seconds).padStart(2, '0');
  return `${sec} : ${min}`;
});

const resetTimer = () => {
  timer.minutes = timerSetting.minutes
  timer.seconds = timerSetting.seconds
};

const startTimer = () => {
  if (!timer.timerRunning) {
    resetTimer()
    timer.timerRunning = true;
    timer.timerId = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        stopTimer();
        return;
      }
      if (timer.seconds === 0) {
        timer.minutes--;
        timer.seconds = 59;
      } else {
        timer.seconds--;
      }
    }, 1000);
  }
};

const stopTimer = () => {
  timer.timerRunning = false;
  clearInterval(timer.timerId);
};
</script>
<style>

</style>