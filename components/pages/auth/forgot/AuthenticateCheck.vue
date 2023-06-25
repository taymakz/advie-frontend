<template>
  <div>
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-center text-lg text-slate-500 dark:text-slate-400">
        فراموشی کلمه عبور
      </h1>
    </div>
    <!-- Form -->
    <div class="mb-6">

      <Form @submit="forgotPassword" v-slot="{ meta,validate }" :validation-schema="usernameSchema">


        <base-form-input focus name="username" v-model="username" label="شماره موبایل یا ایمیل"
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
import * as Yup from "yup"
import {UserAuthenticateCheck} from "~/services/account/authenticate.service";
import {AuthenticateSection} from "~/models/account/authenticate/AuthenticateDTO";

import {UserForgotPasswordCheck} from "~/services/account/password.service";
import {ForgotPasswordSection} from "~/models/account/password/PasswordDTO";

const username = ref("")
const loading = ref(false)
const toast = useToast();

const emits = defineEmits(['changeSection', 'usernameChange'])
watch(username, (newUsername) => {
  emits("usernameChange", newUsername);
});
const usernameSchema = Yup.object().shape({
  username: Yup
      .string().username()
});
const forgotPassword = async (data: any, formEvent: any) => {
  loading.value = true;
  if (!validateUsername(username.value)) {
    formEvent.setFieldError("username", "شماره موبایل و یا ایمیل نامعتبر است");
    loading.value = false;
    return;
  }
  const result = await UserForgotPasswordCheck(username.value);
  loading.value = false;

  if (result.success) {
    emits('changeSection', ForgotPasswordSection.OTP)

      toast.add({title: result.message, color: 'green'})


  } else {
    formEvent.setFieldError("username", result.message);
  }
};
onMounted(() => {
  let usernameLocalStorage = localStorage.getItem('username')
  if (usernameLocalStorage) {
    username.value = usernameLocalStorage
    localStorage.removeItem('username')
  }
})

</script>

<style scoped>

</style>