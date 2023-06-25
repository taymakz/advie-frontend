<script setup lang="ts">
import * as Yup from 'yup'
import { validateEmail } from '~/utils/Validators'
import { SubmitNewsletter } from '~/services/website/newsletter.service'

const toast = useToast()
const loading = ref(false)
const email = ref('')

const emailSchema = Yup.object().shape({
  email: Yup
    .string().email().required(),
})

async function submitEmail() {
  if (!validateEmail(email.value))
    return
  loading.value = true
  const result = await SubmitNewsletter(email.value)
  loading.value = false
  if (result.success)
    toast.add({ title: result.message, color: 'green' })

  else
    toast.add({ title: result.message, color: 'red' })
}
</script>

<template>
  <div class="flex-1 max-w-lg w-full">
    <Form v-slot="{ meta }" :validation-schema="emailSchema" @submit="submitEmail">
      <div
        class="relative bg-gray-100 dark:bg-slate-900  text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-between gap-x-3 p-1 px-4 "
      >
        <Field
          v-slot="{ field }"
          v-model="email"
          name="email"
          validate-on-input
        >
          <label id="email-label" class="hidden">ایمیل</label>
          <input
            id="emailInput"
            aria-labelledby="email-label"
            type="text"
            class="placeholder:text-xs text-sm focus:outline-none bg-transparent w-full p-2 border-none focus:ring-0"
            v-bind="field"
            placeholder="ایمیل شما"
            autocomplete="off"
            :disabled="loading"
          >
        </Field>

        <div class="absolute left-0">
          <base-button
            :disabled="meta.valid === false || loading"
            type="submit"
            class="text-sm py-3 sm:py-3.5 text-slate-100 dark:text-slate-100 rounded-l-lg rounded-r-none bg-sky-600 hover:bg-sky-700 dark:bg-sky-900 dark:hover:bg-sky-600 px-8"
          >
            <span>  ثبت </span>
          </base-button>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>
