<script setup lang="ts">
import * as Yup from 'yup'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { UserEditDetail } from '~/services/account/user.profile.service'
import { validateNationalCode } from '~/utils/Validators'

const emits = defineEmits(['loading'])

const modelValue = defineModel()
const authStore = useAuthenticateStore()
const isFormChanged = ref(false)
const loading = ref(false)
const toast = useToast()
const formSchema = Yup.object().shape({
  national_code: Yup.string().required().test('receiver_postal_code', 'کد ملی نامعتبر است', validateNationalCode),
})
const formData = reactive({
  national_code: authStore.currentUser?.national_code,

})
watch(formData, () => {
  isFormChanged.value = true
})

async function SubmitForm() {
  if (!isFormChanged.value) {
    modelValue.value = false

    return
  }
  const newUserData = new FormData()
  newUserData.append('national_code', formData.national_code ?? '')
  loading.value = true
  emits('loading', true)

  const result = await UserEditDetail(newUserData)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    modelValue.value = false
    await authStore.SetCurrentUserValue()
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
  emits('loading', false)

  loading.value = false
}
</script>

<template>
  <UModal v-model="modelValue" :ui="{ width: 'max-w-lg' }">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-slate-600 dark:text-slate-300">
            <template v-if="authStore.currentUser?.national_code">
              ویرایش کد ملی
            </template>
            <template v-else>
              ثبت کد ملی
            </template>
          </h3>
          <div class="w-24">
            <UButton block size="lg" color="red" variant="outline" label="بستن" @click="modelValue = false" />
          </div>
        </div>
      </template>
      <Form v-slot="{ meta }" :validation-schema="formSchema" :initial-values="formData" @submit="SubmitForm">
        <Field v-slot="{ field }" name="national_code">
          <base-form-input
            v-model="formData.national_code" ltr focus v-bind="field" type="text" label="کد ملی"
            :disabled="loading"
          />
        </Field>

        <div class="flex justify-end">
          <div class="w-fit md:w-full">
            <UButton
              type="submit"
              block
              size="lg" color="sky" label="ویرایش" :disabled="meta.valid === false"
              :loading="loading"
            />
          </div>
        </div>
      </Form>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
