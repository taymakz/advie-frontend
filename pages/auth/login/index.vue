<script setup lang="ts">
import type { Ref } from 'vue'
import { AuthenticateSection } from '~/models/account/authenticate/AuthenticateDTO'

definePageMeta({
  layout: false,
  middleware: 'not-authenticated',

})
useSeoMeta({
  title: 'ورود | ثبت نام - فروشگاه اینترنتی ادویه',
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
  <div>
    <div class="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <UCard
        class=""
        :ui="{
          base: 'overflow-hidden w-[400px] sm:w-full relative',
          body: {
            padding: 'px-10 py-5 sm:p-6',
          },
        }"
      >
        <div v-if="section !== AuthenticateSection.USERNAME" class="absolute -top-0 -right-0">
          <div
            class="group bg-gray-200 dark:bg-gray-800 hover:bg-sky-600 hover:dark:bg-sky-600 transition-colors duration-150  p-1 w-14 rounded-bl-lg cursor-pointer flex items-center justify-center"
            @click="section = AuthenticateSection.USERNAME"
          >
            <Icon
              name="ion:arrow-forward-outline" size="25"
              class="group-hover:text-slate-100 text-sky-500 dark:text-sky-400"
            />
          </div>
        </div>
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
      </UCard>
    </div>
  </div>
</template>
