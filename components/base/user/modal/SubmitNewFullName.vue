<script setup lang="ts">
import * as Yup from 'yup'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { UserEditDetail } from '~/services/account/user.profile.service'

const emits = defineEmits(['loading'])
const modelValue = defineModel()
const authStore = useAuthenticateStore()
const isFormChanged = ref(false)
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
    modelValue.value = false

    return
  }
  const newUserData = new FormData()
  newUserData.append('first_name', formData.first_name ?? '')
  newUserData.append('last_name', formData.last_name ?? '')
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
  <UModal v-model="modelValue" :ui="{ width: 'max-w-2xl' }">
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

          <div class="w-24">
            <UButton block size="lg" color="red" label="بستن" @click="modelValue = false" />
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
