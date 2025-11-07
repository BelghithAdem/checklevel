<script setup lang="ts">
interface Props {
  label: string
  loading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
})
</script>

<template>
  <button
    type="submit"
    :disabled="disabled || loading"
    class="w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span v-if="loading" class="flex items-center justify-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading...
    </span>
    <span v-else>{{ label }}</span>
  </button>
</template>
