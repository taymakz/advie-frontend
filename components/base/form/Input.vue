<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    default: '',
  },
  refValue: {
    default: '',
  },
  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  ignoreErrorMessage: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  inputClasses: {
    type: String,
    default: '',
  },
  autoComplete: {
    type: Boolean,
    default: true,
  },
  focus: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['focusoutInput'])
const modelValue = defineModel()
const input = ref()
onMounted(() => {
  if (props.focus)
    input.value.focus()
})

function handleFocusoutInput() {
  emits('focusoutInput')
}

const { errorMessage } = useField(props.name, undefined)
</script>

<template>
  <div>
    <label
      :for="name"
      class="relative block overflow-hidden rounded-md border-b-4 border-transparent cursor-text px-3 pt-3 shadow-sm bg-gray-100 dark:bg-gray-800"
      :class="{ 'border-red-600 dark:border-red-600': errorMessage }"
    >
      <input
        :id="name"
        ref="input"
        v-model="modelValue"
        :autocomplete="autoComplete ? 'on' : 'off'"
        :name="name"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        placeholder=" "
        class="peer h-10 w-full border-none bg-transparent p-0 cursor-text placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-slate-400 sm:text-sm"
        @focusout="handleFocusoutInput"
      >

      <span
        class="absolute start-3 top-3 -translate-y-1/2 cursor-default text-xs  text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-400 peer-focus:text-slate-400 peer-focus:dark:text-slate-500 select-none"
      >
        {{ label }}
      </span>
    </label>
    <div class=" my-2 h-6">
      <p v-if="errorMessage && !ignoreErrorMessage" class="text-xs font-iranyekanMedium text-red-600 dark:text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
