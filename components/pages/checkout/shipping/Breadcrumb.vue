<template>
  <div class="mb-4 bg-white dark:bg-gray-900  rounded-lg  ">
    <ol
      class="grid grid-cols-3 overflow-hidden divide-x-reverse  divide-x divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500"
    >
      <li class="flex flex-col items-center justify-center  gap-2 p-4 text-sky-600 dark:text-sky-500 opacity-50 text-xs">
        <Icon
          name="ic:round-done" size="20"
        />

        <p class="leading-none ">
          سبد خرید
        </p>
      </li>
      <li class="flex flex-col items-center justify-center  gap-2 p-4 text-sky-600 dark:text-sky-500  bg-gray-100 dark:bg-gray-800">
        <Icon
          name="carbon:delivery" size="24"
        />

        <p class="leading-none ">
          شیوه ارسال
        </p>
      </li>
      <li class="flex flex-col items-center justify-center  gap-2 p-4 sm:text-xs ">
        <Icon
          name="fluent:wallet-credit-card-16-regular" size="20"
        />

        <p class="leading-none ">
          پرداخت
        </p>
      </li>
    </ol>
  </div>
</template>
