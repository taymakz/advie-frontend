<template>

  <div class="w-[400px] sm:w-full bg-white dark:bg-gray-900 rounded-lg drop-shadow-xl">
    <!-- Card -->
    <div class="py-5 px-10">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-8">
        <div class=" w-60">
          <nuxt-link to="/">
            <base-logo class="w-full h-auto"/>
          </nuxt-link>
        </div>
      </div>

      <template v-if="section===ForgotPasswordSection.USERNAME">
        <PagesAuthForgotAuthenticateCheck @usernameChange="handleUsernameChange"
                                          @changeSection="(state)=>section=state"/>
      </template>

      <template v-if="section===ForgotPasswordSection.OTP">
        <PagesAuthForgotOneTimePassword :username="username" @changeSection="(state)=>section=state"/>
      </template>
      <template v-if="section===ForgotPasswordSection.NEW_PASSWORD">
        <PagesAuthForgotNewPassword :username="username" @changeSection="(state)=>section=state"/>
      </template>
    </div>

  </div>

</template>

<script setup lang="ts">
import {Ref} from "vue";
import {ForgotPasswordSection} from "~/models/account/password/PasswordDTO";

definePageMeta({
  layout: 'auth',
  middleware: 'not-authenticated'
})

const username = ref("")
const section: Ref<ForgotPasswordSection> = ref(ForgotPasswordSection.USERNAME)
const handleUsernameChange = (newUsername: string) => {
  // Update the username value in the parent component
  username.value = newUsername;
}


</script>

<style scoped>

</style>