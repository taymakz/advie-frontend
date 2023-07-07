<template>
  <ClientOnly>
    <UPopover>
      <div
        class="bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500  group flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full cursor-pointer"
      >
        <div class="sr-only">
          Website Theme Toggle
        </div>
        <Icon
          :name="$colorMode.value === 'dark' ? 'ph:moon-stars' : 'material-symbols:sunny-outline-rounded'"
          size="20"
          class="group-hover:text-white text-sky-500 dark:text-sky-400"
        />
      </div>
      <template #panel>
        <ul class="flex flex-col w-36">
          <li>
            <div
              :class="$colorMode.preference === 'light' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"
              class="flex items-center justify-start py-3 text-sm gap-x-2 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer"
              @click="$colorMode.preference = 'light'"
            >
              <Icon
                name="material-symbols:sunny-outline-rounded" size="24" class="mr-4"
                :class="$colorMode.preference === 'light' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"
              />
              <div>
                روشن
              </div>
            </div>
          </li>
          <li>
            <div
              :class="$colorMode.preference === 'dark' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"

              class="flex items-center justify-start py-3 text-sm gap-x-2 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer"
              @click="$colorMode.preference = 'dark'"
            >
              <Icon
                name="ph:moon-stars" size="24" class="mr-4"
                :class="$colorMode.preference === 'dark' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"
              />
              <div>
                تیره
              </div>
            </div>
          </li>
          <li>
            <div
              :class="$colorMode.preference === 'system' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"

              class="flex items-center justify-start py-3 text-sm gap-x-2  hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer"

              @click="$colorMode.preference = 'system'"
            >
              <Icon
                name="system-uicons:airplay" size="24" class="mr-4"
                :class="$colorMode.preference === 'system' ? '!text-sky-600' : '!text-gray-500 dark:!text-gray-400'"
              />
              <div>
                خودکار
              </div>
            </div>
          </li>
        </ul>
      </template>
    </UPopover>
  </ClientOnly>
</template>

<style scoped>

</style>
