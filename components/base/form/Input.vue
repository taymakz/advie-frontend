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
  ltr: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: '',
  },
  labelClasses: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  withBorder: {
    type: Boolean,
    default: false,
  },

  withButton: {
    type: Boolean,
    default: false,
  },

  buttonLabel: {
    type: String,
    default: '',
  },
  buttonColor: {
    type: String,
    default: 'sky',
  },

  buttonLoading: {
    type: Boolean,
    default: false,
  },
  buttonDisabled: {
    type: Boolean,
    default: false,
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
const emits = defineEmits(['focusoutInput', 'buttonClicked'])
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
      class="relative flex items-center justify-between"
      :class="{
        'overflow-hidden rounded-md border-b-4 border-transparent cursor-text px-3 pt-3 shadow-sm bg-gray-100 dark:bg-gray-800': !withBorder,
        'rounded-md border border-gray-200 dark:border-gray-700 shadow-sm': withBorder,
        '!border-red-600 dark:!border-red-600': errorMessage,
      }"
    >
      <input
        :id="name"
        ref="input"
        v-model="modelValue"
        :dir="ltr ? 'ltr' : ''"
        :autocomplete="autoComplete ? 'on' : 'off'"
        :name="name"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        placeholder=" "
        :class="{
          'peer h-10 w-full border-none bg-transparent p-0 cursor-text placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-slate-400 sm:text-sm': !withBorder,
          'w-full text-slate-600 dark:text-slate-300  peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0': withBorder,
          'text-left': ltr,
        }"
        @focusout="handleFocusoutInput"
      >
      <template v-if="withButton">

        <UButton
          :label="buttonLoading ? '' : buttonLabel"
          :loading="buttonLoading"
          :disabled="buttonDisabled"
          size="lg"
          variant="link"
          :color="buttonColor"
          @click="$emit('buttonClicked')"
        />

      </template>
      <span
        :class="[
          { 'pointer-events-none absolute start-2.5 top-0 -translate-y-1/2  p-0.5 text-xs text-slate-500 dark:text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs ': withBorder },
          { 'absolute start-3 top-3 -translate-y-1/2 cursor-pointer text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-400 select-none': !withBorder },
          labelClasses,
        ]"
      >
        {{ label }}
      </span>
    </label>
    <div class="my-2 h-6">
      <p v-if="errorMessage && !ignoreErrorMessage" class="text-xs font-iranyekanMedium text-red-600 dark:text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
