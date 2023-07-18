<script setup lang="ts">
definePageMeta({
  layout: 'user-panel',
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
    <!-- Section Title -->
    <div class="flex mb-5">
      <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
        اطلاعات حساب کاربری
        <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
      </h1>
    </div>
    <!-- Section Content -->
    <div class="grid grid-cols-12 gap-4 ">
      <div class="col-span-6  md:col-span-12">
        <PagesPanelProfileFullName />
      </div>
      <div class="col-span-6 md:col-span-12 ">
        <PagesPanelProfileNationalCode />
      </div>
      <div class="col-span-6 md:col-span-12 ">
        <PagesPanelProfilePhone />
      </div>
      <div class="col-span-6 md:col-span-12 ">
        <PagesPanelProfileEmail />
      </div>
      <div class="col-span-12 ">
        <PagesPanelProfilePassword />
      </div>
    </div>
  </div>
</template>
