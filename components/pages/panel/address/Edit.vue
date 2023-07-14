<script setup lang="ts">
import * as Yup from 'yup'
import type { AddressDetailDTO, AddressEditDTO } from '~/models/account/user/AddressDTO'
import { provinces } from '~/utils/persian/provinces'
import { cities } from '~/utils/persian/cities'
import { UserEditAddress } from '~/services/account/user.address.service'
import { validateNationalCode, validatePostalCode } from '~/utils/Validators'

const props = defineProps<{
  address: AddressDetailDTO
}>()
const emits = defineEmits(['closeModal', 'edited'])
const formData = reactive<AddressEditDTO>({
  id: props.address.id,
  receiver_province: props.address.receiver_province,
  receiver_city: props.address.receiver_city,
  receiver_postal_code: props.address.receiver_postal_code,
  receiver_address: props.address.receiver_address,
  receiver_phone: props.address.receiver_phone,
  receiver_name: props.address.receiver_name,
  receiver_family: props.address.receiver_family,
  receiver_national_code: props.address.receiver_national_code,
})

const isFormChanged = ref(false)
const loading = ref(false)
const toast = useToast()

const formSchema = Yup.object().shape({
  receiver_name: Yup.string().required().max(55, 'نام گیرنده باید کمتر از 100 کاراکتر باشد'),
  receiver_family: Yup.string().required().max(55, 'نام خانوادگی گیرنده باید کمتر از 100 کاراکتر باشد'),
  receiver_national_code: Yup.string().required().test('receiver_postal_code', 'کد ملی نامعتبر است', validateNationalCode),
  receiver_phone: Yup
    .string().required().test('receiver_phone', 'شماره موبایل نامعتبر است', validatePhoneNumber),
  receiver_address: Yup.string().max(100, 'آدرس باید کمتر از 100 کاراکتر باشد').min(10, 'آدرس باید بیشتر از 10 کاراکتر باشد').required(),
  receiver_postal_code: Yup.string().required().test('receiver_postal_code', 'کد پستی نامعتبر است', validatePostalCode),
})
watch(formData, () => {
  isFormChanged.value = true
})

async function EditAddress() {
  if (!isFormChanged.value) {
    emits('closeModal')
    return
  }

  if (formData.receiver_province === '') {
    toast.add({ title: 'لطفا استان خود را انتخاب کنید', color: 'red' })
    return
  }
  if (formData.receiver_city === '') {
    toast.add({ title: 'لطفا شهر خود را انتخاب کنید', color: 'red' })
    return
  }

  loading.value = true
  const result = await UserEditAddress(formData)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    emits('edited', formData)
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }
  loading.value = false
}

const formattedProvinces = computed(() => {
  return provinces.map(province => province.key)
})
const filteredCities = computed(() => {
  if (formData.receiver_province)
    return cities[formData.receiver_province].map((city: { key: string; name: string }) => city.key)

  return []
})
watch(() => formData.receiver_province, () => {
  formData.receiver_city = ''
})
</script>

<template>
  <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-slate-600 dark:text-slate-300">
          ویرایش آدرس
        </h3>
        <div class="w-24">
          <UButton block size="lg" color="red" label="بستن" @click="$emit('closeModal')" />
        </div>
      </div>
    </template>
    <Form v-slot="{ meta }" :validation-schema="formSchema" :initial-values="formData" @submit="EditAddress">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 md:col-span-12">
          <Field v-slot="{ field }" name="receiver_name">
            <base-form-input
              v-model="formData.receiver_name" v-bind="field" type="text" label="نام گیرنده"
              :disabled="loading"
            />
          </Field>
        </div>
        <div class="col-span-6 md:col-span-12">
          <Field v-slot="{ field }" name="receiver_family">
            <base-form-input
              v-model="formData.receiver_family" v-bind="field" type="text" label="نام خانوادگی گیرنده"
              :disabled="loading"
            />
          </Field>
        </div>
        <div class="col-span-6 md:col-span-12">
          <Field v-slot="{ field }" name="receiver_phone">
            <base-form-input
              v-model="formData.receiver_phone" v-bind="field" type="text" label="شماره موبایل گیرنده"
              :disabled="loading"
            />
          </Field>
        </div>
        <div class="col-span-6 md:col-span-12">
          <Field v-slot="{ field }" name="receiver_national_code">
            <base-form-input
              v-model="formData.receiver_national_code" v-bind="field" type="text" label="کد ملی گیرنده"
              :disabled="loading"
            />
          </Field>
        </div>
        <div class="col-span-12">
          <Field v-slot="{ field }" name="receiver_postal_code">
            <base-form-input
              v-model="formData.receiver_postal_code" v-bind="field" type="text" label="کد پستی"
              :disabled="loading"
            />
          </Field>
        </div>
        <div class="col-span-6 md:col-span-12 mb-6 ">
          <UFormGroup label="استان">
            <USelectMenu
              id="receiver_province" v-model="formData.receiver_province"
              searchable
              placeholder="استان خود را انتخاب کنید"
              searchable-placeholder="استان خود را جستجو کنید"
              :disabled="loading"

              :options="formattedProvinces"
              size="xl"
            />
          </UFormGroup>
        </div>
        <div class="col-span-6 md:col-span-12 mb-6">
          <UFormGroup label="شهر">
            <USelectMenu
              id="receiver_province" v-model="formData.receiver_city"
              searchable
              placeholder="شهر خود را انتخاب کنید"
              searchable-placeholder="شهر خود را جستجو کنید"
              :disabled="formData.receiver_province === '' || loading"
              :options="filteredCities"
              size="xl"
            />
          </UFormGroup>
        </div>
        <div class="col-span-12">
          <Field v-slot="{ field }" name="receiver_address">
            <base-form-input
              v-model="formData.receiver_address" v-bind="field" type="text" label="آدرس"
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
            size="lg" color="sky" label="ویرایش آدرس" :disabled="meta.valid === false"
            :loading="loading"
          />
        </div>
      </div>
    </Form>
  </UCard>
</template>

<style scoped>

</style>
