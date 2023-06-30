<script setup lang="ts">
import * as Yup from 'yup'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { UserEditDetail } from '~/services/account/user.profile.service'
import { validateNationalCode } from '~/utils/Validators'

const authStore = useAuthenticateStore()
const isFormChanged = ref(false)

const isOpenModal = ref(false)
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
    isOpenModal.value = false

    return
  }
  const newUserData = new FormData()
  newUserData.append('national_code', formData.national_code ?? '')
  loading.value = true
  const result = await UserEditDetail(newUserData)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    isOpenModal.value = false
    await authStore.SetCurrentUserValue()
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
  loading.value = false
}
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:dark:border-gray-600 p-4 cursor-pointer select-none"
      @click="isOpenModal = true"
    >
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
          <h4 class="text-slate-500 dark:text-slate-400">
            کد ملی
          </h4>
          <div v-if="!authStore.currentUser?.national_code">
            <BaseBeutyPing />
          </div>
        </div>
        <p class="text-slate-600 dark:text-slate-300">
          {{ authStore.currentUser?.national_code }}
        </p>
      </div>
      <div>
        <Icon
          v-if="authStore.currentUser?.national_code" name="ic:baseline-mode-edit" size="24"
          class="text-sky-500 dark:text-sky-400"
        />

        <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
      </div>
    </div>
    <UModal v-model="isOpenModal" :ui="{ width: 'max-w-lg' }">
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
            <div>
              <base-button class="py-2 px-4 w-24" theme="rose" @click="isOpenModal = false">
                بستن
              </base-button>
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
            <base-button
              type="submit"

              class="py-2 px-4 md:w-full " theme="sky" :disabled="meta.valid === false" :loading="loading"
            >
              ویرایش
            </base-button>
          </div>
        </Form>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped>

</style>
