<script setup lang="ts">
import type { Ref } from 'vue'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'

definePageMeta({
  layout: 'auth',
  middleware: 'not-authenticated',

})

const username = ref('')
const canLoginWithPassword = ref(false)
const section: Ref<AuthenticateSection> = ref(AuthenticateSection.USERNAME)

function handleUsernameChange(newUsername: string) {
  // Update the username value in the parent component
  username.value = newUsername
}

watch(section, (newVal, oldVal) => {
  if (oldVal === AuthenticateSection.OTP)
    canLoginWithPassword.value = false
})
</script>

<template>
  <div class="w-[400px] sm:w-full bg-white dark:bg-gray-900 rounded-lg drop-shadow-xl">
    <!-- Card -->
    <div class="py-5 px-10">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-8">
        <div class=" w-60">
          <nuxt-link to="/">
            <base-logo class="w-full h-auto" />
          </nuxt-link>
        </div>
      </div>

      <template v-if="section === AuthenticateSection.USERNAME">
        <PagesAuthLoginAuthenticateCheck
          @username-change="handleUsernameChange"
          @change-section="(state) => section = state"
        />
      </template>
      <template v-if="section === AuthenticateSection.PASSWORD">
        <PagesAuthLoginPassword
          :username="username" @change-section="(state) => section = state"
          @can-login-with-password="(state) => canLoginWithPassword = state"
        />
      </template>
      <template v-if="section === AuthenticateSection.OTP">
        <PagesAuthLoginOneTimePassword
          :username="username" :can-login-with-password="canLoginWithPassword"
          @change-section="(state) => section = state"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
