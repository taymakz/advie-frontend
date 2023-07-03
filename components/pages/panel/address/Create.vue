<script setup lang="ts">
import * as Yup from 'yup'
import type { AddressCreateDTO } from '~/models/account/user/AddressDTO'
import { provinces } from '~/utils/persian/provinces'
import { cities } from '~/utils/persian/cities'
import { UserCreateAddress } from '~/services/account/user.address.service'
import { validateNationalCode, validatePostalCode } from '~/utils/Validators'

const emits = defineEmits(['closeModal', 'created'])

const formData = reactive<AddressCreateDTO>({
  receiver_province: '',
  receiver_city: '',
  receiver_postal_code: '',
  receiver_address: '',
  receiver_phone: '',
  receiver_name: '',
  receiver_family: '',
  receiver_national_code: '',
})

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

async function CreateAddress() {
  if (formData.receiver_province === '') {
    toast.add({ title: 'لطفا استان خود را انتخاب کنید', color: 'red' })

    return
  }
  if (formData.receiver_city === '') {
    toast.add({ title: 'لطفا شهر خود را انتخاب کنید', color: 'red' })

    return
  }
  loading.value = true
  const result = await UserCreateAddress(formData)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })

    emits('created')
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
          ثبت آدرس جدید
        </h3>

        <div class="w-24">
          <UButton block size="lg" color="red" variant="outline" label="بستن" @click="$emit('closeModal')" />
        </div>
      </div>
    </template>
    <Form v-slot="{ meta }" :validation-schema="formSchema" @submit="CreateAddress">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 md:col-span-12">
          <Field v-slot="{ field }" name="receiver_name">
            <base-form-input
              v-model="formData.receiver_name" v-bind="field" type="text" focus label="نام گیرنده"
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
        <div class="col-span-6 md:col-span-12 mb-6">
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
            size="lg" color="sky" label="افزودن آدرس جدید" :disabled="meta.valid === false"
            :loading="loading"
          />
        </div>
      </div>
    </Form>
  </UCard>
</template>
