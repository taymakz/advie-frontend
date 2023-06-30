<script setup lang="ts">
import * as Yup from 'yup'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { UserEditDetail } from '~/services/account/user.profile.service'

const authStore = useAuthenticateStore()
const isFormChanged = ref(false)

const isOpenModal = ref(false)
const loading = ref(false)
const toast = useToast()
const formSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
})
const formData = reactive({
  first_name: authStore.currentUser?.first_name,
  last_name: authStore.currentUser?.last_name,

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
  newUserData.append('first_name', formData.first_name ?? '')
  newUserData.append('last_name', formData.last_name ?? '')
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
      class="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:dark:border-gray-600  p-4 cursor-pointer select-none "
      @click="isOpenModal = true"
    >
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
          <h4 class="text-slate-500 dark:text-slate-400">
            نام و نام خانوادگی
          </h4>
          <div v-if="!authStore.currentUser?.first_name">
            <BaseBeutyPing />
          </div>
        </div>
        <p class="text-slate-600 dark:text-slate-300">
          {{ authStore.currentUser?.first_name }} {{ authStore.currentUser?.last_name }}
        </p>
      </div>
      <div>
        <Icon
          v-if="authStore.currentUser?.first_name" name="ic:baseline-mode-edit" size="24"
          class="text-sky-500 dark:text-sky-400"
        />

        <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
      </div>
    </div>
    <UModal v-model="isOpenModal" :ui="{ width: 'max-w-2xl' }">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-slate-600 dark:text-slate-300">
              <template v-if="authStore.currentUser?.first_name">
                ویرایش نام و نام خانوادگی
              </template>
              <template v-else>
                ثبت نام و نام خانوادگی
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
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6 md:col-span-12">
              <Field v-slot="{ field }" name="first_name">
                <base-form-input
                  v-model="formData.first_name" v-bind="field" focus type="text" label="نام"
                  :disabled="loading"
                />
              </Field>
            </div>
            <div class="col-span-6 md:col-span-12">
              <Field v-slot="{ field }" name="last_name">
                <base-form-input
                  v-model="formData.last_name" v-bind="field" type="text" label="نام خانوادگی"
                  :disabled="loading"
                />
              </Field>
            </div>
          </div>

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
