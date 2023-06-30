<script setup lang="ts">
import type { Ref } from 'vue'
import { GetAddressList, UserRemoveAddress } from '~/services/account/user.address.service'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'

definePageMeta({
  layout: 'user-panel',
})

const toast = useToast()
const loading = ref(false)
const pending = ref(false)
const removePending = ref()
const isOpenCreateAddressModal = ref(false)
const isOpenEditAddressModal = ref(false)

const addresses: Ref<AddressDetailDTO[]> = ref([])
const selectedAddress: Ref<AddressDetailDTO | null> = ref(null)

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
</script>

<template>
  <div class="bg-white dark:bg-gray-800  rounded-lg border border-gray-200 dark:border-gray-700 p-4">
    <!-- Section Title -->
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-lg text-slate-700 dark:text-slate-200 border-b-2 border-sky-600 pb-1 select-none ">
        آدرس ها
      </h1>

      <template v-if="canAddMoreAddress">
        <base-button
          :disabled="pending "
          :loading="loading"
          class="py-3 px-4"
          icon="material-symbols:add-location-alt-outline-rounded" icon-classes="!text-slate-200 dark:!text-slate-200"
          icon-pos="right" @click="isOpenCreateAddressModal = true"
        >
          ثبت آدرس جدید
        </base-button>
      </template>
      <template v-else>
        <UTooltip text="شما نمی توانید بیش از 5 آدرس داشته باشید">
          <base-button
            :disabled="!canAddMoreAddress"
            class="py-3 px-4" icon="material-symbols:add-location-alt-outline-rounded"
            icon-classes="!text-slate-200 dark:!text-slate-200" icon-pos="right"
          >
            ثبت آدرس جدید
          </base-button>
        </UTooltip>
      </template>
    </div>
    <!-- Section Content -->
    <div>
      <!-- Address List -->
      <div class="flex flex-col gap-y-2">
        <!-- Address Skeleton -->
        <template v-if="pending">
          <div v-for="i in 3" :key="i" class="relative bg-gray-100 dark:bg-gray-900 py-4 px-4 rounded-lg">
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
          <div v-if="addresses.length > 0">
            <div
              v-for="item in addresses" :key="item.id"
              class="relative bg-gray-100 dark:bg-gray-900 py-4 px-4 rounded-lg "
              :class="{ 'blur select-none': removePending === item.id }"
            >
              <div class="flex flex-col gap-y-4 text-sm">
                <p class=" text-slate-700 dark:text-slate-200">
                  {{ item.receiver_address }}
                </p>
                <div class="grid grid-cols-4 lg:grid-cols-2 items-center  center gap-4  w-fit lg:w-full">
                  <div class="flex items-center  gap-x-2">
                    <Icon name="solar:signpost-broken" size="20" class="!text-slate-600 dark:!text-slate-300" />
                    <p class="text-slate-600 dark:text-slate-300">
                      {{ item.receiver_province }}, {{ item.receiver_city }}
                    </p>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <Icon name="material-symbols:mail-outline" size="20" class="!text-slate-600 dark:!text-slate-300" />
                    <p class="text-slate-600 dark:text-slate-300">
                      {{ item.receiver_postal_code }}
                    </p>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <Icon name="solar:phone-linear" size="20" class="!text-slate-600 dark:!text-slate-300" />
                    <p class="text-slate-600 dark:text-slate-300">
                      {{ item.receiver_phone }}
                    </p>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <Icon name="solar:user-outline" size="20" class="!text-slate-600 dark:!text-slate-300" />
                    <p class="text-slate-600 dark:text-slate-300">
                      {{ item.receiver_name }} {{ item.receiver_family }}
                    </p>
                  </div>
                </div>
                <div class="hidden md:flex items-center justify-end gap-x-4">
                  <base-button
                    class="py-3 px-4 w-32 sm:w-full" theme="sky" :disabled="loading"
                    @click="editAddress(item)"
                  >
                    ویرایش
                  </base-button>
                  <base-button
                    class="py-3 px-4 w-32 sm:w-full" theme="rose" :disabled="loading"
                    @click="removeAddress(item.id)"
                  >
                    حذف
                  </base-button>
                </div>
              </div>
              <div class="absolute left-2 top-4 md:hidden">
                <UPopover v-if="removePending !== item.id ">
                  <Icon name="humbleicons:dots-vertical" size="20" />

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
                              name="streamline:interface-delete-bin-1-remove-delete-empty-bin-trash-garbage" size="20"
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
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-y-4 items-center justify-center">
              <div>
                <Icon name="ic:twotone-location-off" size="80" class="!text-slate-500 dark:text-slate-400" />
              </div>
              <div class="text-slate-500 dark:text-slate-400">
                آدرسی یافت نشد!
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <UModal
      v-model="isOpenCreateAddressModal" :ui="{
        width: 'max-w-3xl',

      }"
    >
      <PagesPanelAddressCreate
        @close-modal="isOpenCreateAddressModal = false"
        @created="refreshData"
      />
    </UModal>
  </div>
</template>

<style scoped>

</style>
