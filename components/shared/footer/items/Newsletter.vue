<script setup lang="ts">
import * as Yup from 'yup'
import { SubmitNewsletter } from '~/services/website/newsletter.service'

const toast = useToast()
const loading = ref(false)
const email = ref('')

const emailSchema = Yup.object().shape({
  email: Yup
    .string().required().test('email', '', validateEmail),
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
      <div class="bg-gray-100 dark:bg-slate-900  rounded-lg flex items-center justify-between">
        <Field
          v-slot="{ field }"
          v-model="email"
          name="email"
          validate-on-input
        >
          <label id="email-label" class="sr-only">ایمیل</label>
          <div class="flex items-center justify-between w-full">
            <input
              id="emailInput"
              aria-labelledby="email-label"
              dir="ltr"
              type="text"
              class="placeholder:text-sm placeholder:text-right placeholder:text-slate-600 placeholder:dark:text-slate-400 text-slate-800 dark:text-slate-200  focus:outline-none bg-transparent w-full py-2 px-4 border-none focus:ring-0"
              v-bind="field"
              placeholder="ایمیل شما"
              autocomplete="off"
              disabled
            >
            <div class="w-24">
              <UButton
                type="submit"
                :disabled="meta.valid === false || loading"
                aria-label="Submit to Newsletter"
                block
                size="lg"
              >
                <span>  ثبت </span>
              </UButton>
            </div>
          </div>
        </Field>
      </div>
    </Form>
  </div>
</template>
