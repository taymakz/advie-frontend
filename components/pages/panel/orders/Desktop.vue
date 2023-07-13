<script setup lang="ts">
const activeFilterTab = ref(1)
</script>

<template>
  <div>
    <div class="mb-6">
      <nav
        aria-label="Tabs to Filter Orders Status"
        class="flex border-b border-gray-200 dark:border-gray-700  text-sm font-iranyekanMedium"
      >
        <button
          class="-mb-px p-4"
          :class="(activeFilterTab === 1) ? 'text-sky-500 dark:text-sky-400 border-b border-current' : 'text-slate-700 dark:text-slate-200'"
          @click="activeFilterTab = 1"
        >
          همه
        </button>

        <button
          class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"

          :class="(activeFilterTab === 2) ? 'text-sky-500 dark:text-sky-400 border-b border-current' : 'text-slate-700 dark:text-slate-200'"
          @click="activeFilterTab = 2"
        >
          در انتظار تایید
        </button>
        <button
          class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"

          :class="(activeFilterTab === 3) ? 'text-sky-500 dark:text-sky-400 border-b border-current' : 'text-slate-700 dark:text-slate-200'"
          @click="activeFilterTab = 3"
        >
          تحویل داده شده
        </button>

        <button
          class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          :class="(activeFilterTab === 4) ? 'text-sky-500 dark:text-sky-400 border-b border-current' : 'text-slate-700 dark:text-slate-200'"
          @click="activeFilterTab = 4"
        >
          مرجوع شده
        </button>

        <button
          class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          :class="(activeFilterTab === 5) ? 'text-sky-500 dark:text-sky-400 border-b border-current' : 'text-slate-700 dark:text-slate-200'"
          @click="activeFilterTab = 5"
        >
          لغو شده
        </button>
      </nav>
    </div>
  </div>
</template>
