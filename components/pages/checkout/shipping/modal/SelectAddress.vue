<script setup lang="ts">
import type { Ref } from 'vue'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'
import { GetAddressList, UserRemoveAddress } from '~/services/account/user.address.service'

const emits = defineEmits(['selected'])
const modelValue = defineModel()
const toast = useToast()

const loading = ref(false)
const pending = ref(false)
const removePending = ref()

const addresses: Ref<AddressDetailDTO[]> = ref([])
const selectedAddress: Ref<AddressDetailDTO> = ref((addresses.value as AddressDetailDTO[])[0])

const isOpenCreateAddressModal = ref(false)
const isOpenEditAddressModal = ref(false)

async function getAddresses() {
  pending.value = true
  const result = await GetAddressList()
  if (result.success)
    addresses.value = result.data
  else toast.add({ title: result.message, color: 'red' })
  pending.value = false
}

const canAddMoreAddress = computed(() => {
  return addresses.value.length < 6
})

function editAddress(address: AddressDetailDTO) {
  selectedAddress.value = address
  isOpenEditAddressModal.value = true
}

async function removeAddress(id: number) {
  loading.value = true
  removePending.value = id
  const result = await UserRemoveAddress(id)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })
    addresses.value = addresses.value.filter(f => f.id !== id)
  }
  else {
    toast.add({ title: result.message, color: 'red' })
  }

  loading.value = false
  removePending.value = null
}

async function refreshData() {
  isOpenCreateAddressModal.value = false
  isOpenEditAddressModal.value = false
  await getAddresses()
}

onMounted(async () => {
  await getAddresses()
})
watch(() => isOpenCreateAddressModal.value, (newVal) => {
  modelValue.value = !newVal
})
watch(() => isOpenEditAddressModal.value, (newVal) => {
  modelValue.value = !newVal
})
</script>

<template>
  <div>
    <UModal v-model="modelValue" :ui="{ width: 'max-w-2xl' }">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-slate-600 dark:text-slate-300">
              آدرس ها
            </h3>
            <div class="w-24">
              <UButton block size="lg" color="red" variant="outline" label="بستن" @click="modelValue = false" />
            </div>
          </div>
        </template>
        <div>
          <!-- Address List -->
          <div class="flex flex-col gap-y-5">
            <!-- Address Skeleton -->
            <template v-if="pending">
              <div
                v-for="i in 3" :key="i"
                class="relative bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 px-4 rounded-lg"
              >
                <div class="flex flex-col gap-y-4 text-sm">
                  <p class=" text-slate-700 dark:text-slate-200">
                    <USkeleton class="w-96 h-5" />
                  </p>
                  <div class="grid grid-cols-4 lg:grid-cols-2 items-center  center gap-4  w-fit lg:w-full">
                    <USkeleton class="w-28 h-5" />
                    <USkeleton class="w-28 h-5" />
                    <USkeleton class="w-28 h-5" />
                    <USkeleton class="w-28 h-5" />
                  </div>
                  <div class="hidden md:flex items-center justify-end gap-x-4">
                    <USkeleton class="w-32 h-11 sm:w-full" />
                    <USkeleton class="w-32 h-11 sm:w-full" />
                  </div>
                </div>
                <div class="absolute left-3 top-4 md:hidden">
                  <USkeleton class="w-1 h-5" />
                </div>
              </div>
            </template>
            <!-- Address -->
            <template v-else>
              <div
                v-for="item in addresses" :key="item.id"
                class="relative bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 px-4 rounded-lg "
                :class="{ 'blur select-none': removePending === item.id }"
              >
                <div class="flex flex-col gap-y-4 text-sm">
                  <p class=" text-slate-700 dark:text-slate-200">
                    {{ item.receiver_address }}
                  </p>
                  <div class="grid grid-cols-4 lg:grid-cols-2 items-center  center gap-4  w-fit lg:w-full">
                    <div class="flex items-center  gap-x-2">
                      <Icon name="solar:signpost-broken" size="20" class="text-sky-500 dark:text-sky-400" />
                      <p class="text-slate-600 dark:text-slate-300">
                        {{ item.receiver_province }}, {{ item.receiver_city }}
                      </p>
                    </div>
                    <div class="flex items-center gap-x-2">
                      <Icon name="material-symbols:mail-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                      <p class="text-slate-600 dark:text-slate-300">
                        {{ item.receiver_postal_code }}
                      </p>
                    </div>
                    <div class="flex items-center gap-x-2">
                      <Icon name="solar:phone-linear" size="20" class="text-sky-500 dark:text-sky-400" />
                      <p class="text-slate-600 dark:text-slate-300">
                        {{ item.receiver_phone }}
                      </p>
                    </div>
                    <div class="flex items-center gap-x-2">
                      <Icon name="solar:user-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                      <p class="text-slate-600 dark:text-slate-300">
                        {{ item.receiver_name }} {{ item.receiver_family }}
                      </p>
                    </div>
                  </div>
                  <div class="hidden md:flex items-center justify-end gap-x-4">
                    <div class="w-32 sm:w-full">
                      <UButton
                        size="lg"
                        block
                        color="sky"
                        label="ویرایش"
                        :disabled="loading"
                        @click="editAddress(item)"
                      />
                    </div>
                    <div class="w-32 sm:w-full">
                      <UButton
                        size="lg"
                        block
                        color="rose"
                        label="حذف" :disabled="loading"
                        @click="removeAddress(item.id)"
                      />
                    </div>
                  </div>
                </div>
                <div class="absolute left-2 top-4 md:hidden">
                  <UPopover v-if="removePending !== item.id ">
                    <Icon name="humbleicons:dots-vertical" size="20" class="text-sky-500 dark:text-sky-400" />

                    <template #panel>
                      <div class=" w-52">
                        <ul>
                          <li>
                            <button
                              type="button"
                              :disabled="loading"
                              class="group flex items-center justify-start w-full py-4 px-5 gap-x-2 cursor-pointer disabled:cursor-default text-sky-500 dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-slate-800   text-sm disabled:bg-gray-100  disabled:hover:bg-gray-200 dark:disabled:bg-gray-800  dark:disabled:hover:bg-gray-700 disabled:text-slate-500 disabled:dark:text-slate-400"
                              @click="editAddress(item)"
                            >
                              <Icon
                                name="ic:outline-edit-location" size="20"
                                class="group-disabled:!text-slate-500 group-disabled:dark:!text-slate-400"
                              />
                              <span>
                                ویرایش آدرس
                              </span>
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              :disabled="loading"

                              class="group flex items-center justify-start w-full py-4 px-5 gap-x-2 cursor-pointer disabled:cursor-default dark:text-slate-300 hover:bg-red-100 hover:dark:bg-red-900 text-sm disabled:bg-gray-100  disabled:hover:bg-gray-200 dark:disabled:bg-gray-800  dark:disabled:hover:bg-gray-700 disabled:text-slate-500 disabled:dark:text-slate-400"
                              @click="removeAddress(item.id)"
                            >
                              <Icon
                                name="streamline:interface-delete-bin-1-remove-delete-empty-bin-trash-garbage"
                                size="20"
                                class="!text-red-600 dark:!text-red-600 group-hover:dark:!text-red-200 group-disabled:!text-slate-500 group-disabled:dark:!text-slate-400"
                              />
                              <span
                                class="text-red-600 dark:text-red-500 group-hover:dark:text-red-200 group-disabled:!text-slate-500 group-disabled:dark:!text-slate-400"
                              >
                                حذف آدرس
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </UPopover>
                </div>
                <div class="absolute -top-4 -right-1 md:hidden">
                  <div class="w-28">
                    <UButton
                      to="/checkout/shipping/" block size="xs" color="sky" label="انتخاب"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="canAddMoreAddress"
                class="flex border border-gray-200 dark:border-gray-700 relative not-prose rounded-md  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer  text-slate-600 dark:text-slate-300 text-sm hover:text-sky-500 hover:dark:text-sky-400 transition-all duration-150"
                @click="isOpenCreateAddressModal = true"
              >
                <div class="w-full">
                  <div
                    class="relative overflow-hidden rounded  opacity-75 h-[88px]  select-none w-full flex items-center justify-center "
                  >
                    <svg class="absolute inset-0 h-full w-full stroke-gray-900/10 dark:stroke-white/10" fill="none">
                      <defs>
                        <pattern
                          id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e" x="0" y="0" width="10" height="10"
                          patternUnits="userSpaceOnUse"
                        >
                          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
                        </pattern>

                      </defs>
                      <rect
                        stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" width="100%"
                        height="100%"
                      />
                    </svg>
                    <Icon
                      name="ic:round-plus" size="30"
                      class="text-sky-500 dark:text-sky-400 "
                    />
                  </div><!---->
                </div>
              </div>
            </template>
          </div>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isOpenCreateAddressModal" :ui="{ width: 'max-w-2xl' }">
      <PagesPanelAddressCreate
        @close-modal="isOpenCreateAddressModal = false"
        @created="refreshData"
      />
    </UModal>
    <UModal v-model="isOpenEditAddressModal" :ui="{ width: 'max-w-2xl' }">
      <PagesPanelAddressEdit
        :address="selectedAddress"
        @close-modal="isOpenEditAddressModal = false"
        @edited="refreshData"
      />
    </UModal>
  </div>
</template>

<style scoped>

</style>
