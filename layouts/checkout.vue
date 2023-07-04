<template>
  <div class="flex flex-col min-h-screen">
    <SharedHeader />

    <main class="flex-grow bg-gray-100 dark:bg-gray-950 pt-28 md:pt-32 pb-16">
      <slot />
    </main>
  </div>
</template>
