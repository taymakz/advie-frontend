<template>
    <ClientOnly>
          <div>

      <div v-if="loading">
       <USkeleton v-if="loading" class="rounded-full h-8 w-8" />

      </div>
      <div v-else>
        <div class="relative" ref="themeDropdownSection">

        <div
                @click="themeDropdown=!themeDropdown"
                class="bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500  group flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full cursor-pointer">

            <Icon
                    :name="$colorMode.value === 'dark' ? 'ph:moon-stars' : 'material-symbols:sunny-outline-rounded'"
                    size="20"
                    class="group-hover:text-white "/>


        </div>
        <div
                :class="{'hidden':!themeDropdown}"
                class="absolute top-14 left-0 bg-white dark:bg-slate-900 rounded-lg w-36 border border-gray-200 dark:border-none overflow-hidden">
            <ul class="flex flex-col ">
                <li>
                    <div
                            :class="$colorMode.preference==='light' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"
                            @click="$colorMode.preference='light'"
                            class="flex items-center justify-start py-3 text-sm gap-x-2 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                        <Icon name="material-symbols:sunny-outline-rounded" size="24" class="mr-4"
                              :class="$colorMode.preference==='light' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"

                        />
                        <div>

                            روشن
                        </div>
                    </div>
                </li>
                <li>
                    <div
                            :class="$colorMode.preference==='dark' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"


                            @click="$colorMode.preference='dark'"
                            class="flex items-center justify-start py-3 text-sm gap-x-2 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                        <Icon name="ph:moon-stars" size="24" class="mr-4"
                              :class="$colorMode.preference==='dark' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"

                        />
                        <div>
                            تیره

                        </div>
                    </div>
                </li>
                <li>
                    <div
                            :class="$colorMode.preference==='system' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"

                            @click="$colorMode.preference='system'"

                            class="flex items-center justify-start py-3 text-sm gap-x-2  hover:bg-zinc-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                        <Icon name="system-uicons:airplay" size="24" class="mr-4"
                              :class="$colorMode.preference==='system' ? '!text-sky-600':'!text-gray-500 dark:!text-gray-400'"

                        />
                        <div>
                            خودکار
                        </div>
                    </div>
                </li>


            </ul>
        </div>
    </div>
            </div>

    </div>
    </ClientOnly>

</template>

<script setup lang="ts">

const themeDropdownSection = ref()
const themeDropdown = ref(false)

const hideThemeDropdown = () => {
    if (themeDropdown.value) {
        themeDropdown.value = false
    }
}
onClickOutside(themeDropdownSection, hideThemeDropdown)
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>