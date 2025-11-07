<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label: string
  type?: string
  placeholder?: string
  modelValue: string
  required?: boolean
  showPasswordToggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  showPasswordToggle: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  togglePassword: []
}>()

const inputType = computed(() => props.type)
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-slate-900">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :required="required"
        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
      />
      <button
        v-if="showPasswordToggle"
        type="button"
        @click="emit('togglePassword')"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
        aria-label="Toggle password visibility"
      >
        <slot name="icon"></slot>
      </button>
    </div>
  </div>
</template>
