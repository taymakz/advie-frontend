<template>
  <div>
    <SharedHeader />

    <main class="bg-gray-100 dark:bg-gray-950 pt-28 md:pt-32 pb-16 h-screen">
      <div class="container">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-3 lg:hidden ">
            <PagesPanelSidebarDesktop />
          </div>
          <div
            class="col-span-9 lg:col-span-12 "
          >
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
