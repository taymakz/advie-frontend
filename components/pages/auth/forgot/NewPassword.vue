
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

      <Form @submit="resetPassword" v-slot="{ meta,validate }" :validation-schema="passwordSchema">


        <base-form-input type="password" focus name="password" v-model="resetData.password" label="کلمه عبور جدید"
                         :disabled="loading" @focusoutInput="validate"/>
        <base-form-input type="password" name="confirm_password" v-model="resetData.confirm_password" label="تایید کلمه عبور جدید"
                         :disabled="loading" @focusoutInput="validate"/>

        <div class="mb-4">

          <base-button
              type="submit"
              w-full
              :disabled="meta.valid===false || loading"
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


<script setup lang="ts">

import * as Yup from "yup";
import {ForgotPasswordSection} from "~/models/account/password/PasswordDTO";
import {UserForgotPasswordOTP, UserResetPassword} from "~/services/account/password.service";


const loading = ref(false)
const toast = useToast();
const router = useRouter();
const route = useRoute();

const resetData = reactive({
  password: "",
  confirm_password: "",

});

const emits = defineEmits(['changeSection'])

const passwordSchema = Yup.object().shape({
  password: Yup.string().required().min(6,'کلمه عبور باید حداقل 6 و حداکثر 16 حرف باشد').max(16,'کلمه عبور باید حداقل 6 و حداکثر 16 حرف باشد'),
  confirm_password: Yup.string().required().min(6,'کلمه عبور باید حداقل 6 و حداکثر 16 حرف باشد').max(16,'کلمه عبور باید حداقل 6 و حداکثر 16 حرف باشد').oneOf(
      [Yup.ref("password")],
      "کلمه های عبور یکسان نمیباشند"
  ),
});

const goBack = () => {
  const previousSection: any = route.query.prevSec || ForgotPasswordSection.USERNAME
  emits('changeSection', previousSection)
  loading.value = false
}

const props = defineProps({
  username: {
    type: String,
    default: ""
  }
})
const resetPassword = async (data: any, formEvent: any) => {
  loading.value = true;
  try {
    const resetPasswordToken = localStorage.getItem("forgotPasswordToken")

    if (!resetPasswordToken)return emits('changeSection', ForgotPasswordSection.USERNAME)
    const result = await UserResetPassword(props.username, resetPasswordToken,resetData.password,resetData.confirm_password);
    if (result.success) {
      localStorage.removeItem("forgotPasswordToken");
      toast.add({title: result.message, color: 'green'})

      return await router.push("/auth/login/");


    } else {
      formEvent.setFieldError(
          "confirm_password",
          result.message
      );


    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
};
</script>

<style scoped>

</style>