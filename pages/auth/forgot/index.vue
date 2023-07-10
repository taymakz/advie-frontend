<script setup lang="ts">
import type { Ref } from 'vue'
import { ForgotPasswordSection } from '~/models/account/password/PasswordDTO'

useSeoMeta({
  title: 'بازیابی کلمه عبور - فروشگاه اینترنتی ادویه',
})
definePageMeta({
  layout: false,
  middleware: 'not-authenticated',
})

const username = ref('')
const section: Ref<ForgotPasswordSection> = ref(ForgotPasswordSection.USERNAME)

function handleUsernameChange(newUsername: string) {
  // Update the username value in the parent component
  username.value = newUsername
}
</script>

<template>
  <div>
    <div class="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <UCard
        :ui="{
          base: 'overflow-hidden w-[400px] sm:w-full relative',
          body: {
            padding: 'px-10 py-5 sm:p-6',
          },
        }"
      >
        <div v-if="section !== ForgotPasswordSection.USERNAME" class="absolute -top-0 -right-0">
          <div
            class="group bg-gray-200 dark:bg-gray-800 hover:bg-sky-600 hover:dark:bg-sky-600 transition-colors duration-150  p-1 w-14 rounded-bl-lg cursor-pointer flex items-center justify-center"
            @click="section = ForgotPasswordSection.USERNAME"
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

        <template v-if="section === ForgotPasswordSection.USERNAME">
          <PagesAuthForgotAuthenticateCheck
            @username-change="handleUsernameChange"
            @change-section="(state) => section = state"
          />
        </template>

        <template v-if="section === ForgotPasswordSection.OTP">
          <PagesAuthForgotOneTimePassword :username="username" @change-section="(state) => section = state" />
        </template>
        <template v-if="section === ForgotPasswordSection.NEW_PASSWORD">
          <PagesAuthForgotNewPassword :username="username" @change-section="(state) => section = state" />
        </template>
      </UCard>
    </div>
  </div>
</template>
