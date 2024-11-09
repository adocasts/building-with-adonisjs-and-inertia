<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    type?: string
    modelValue: string | number
    placeholder?: string
    error?: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    type: 'string',
  }
)

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="grid gap-1">
    <Label class="grid gap-1">
      <span>{{ label }}</span>

      <slot v-if="type === 'group'" />
      <div v-else-if="type === 'color'" class="relative w-full items-center">
        <input
          v-model="internalValue"
          type="color"
          class="absolute start-2 inset-y-2 w-6 h-6 rounded"
          :disabled="disabled"
        />
        <Input v-model="internalValue" class="pl-10" :disabled="disabled" :required="required" />
      </div>
      <Input
        v-else
        v-model="internalValue"
        :type="type"
        :disabled="disabled"
        :required="required"
      />
    </Label>
    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>
