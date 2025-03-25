<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    type?: string
    modelValue?: string | number
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

const inputEl = ref()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

defineExpose({
  inputEl,
})
</script>

<template>
  <div class="gap-1 grid">
    <Label class="gap-1 grid">
      <span v-if="label">{{ label }}</span>

      <slot v-if="type === 'group'" />
      <div v-else-if="type === 'color'" class="relative items-center w-full">
        <input
          v-model="internalValue"
          type="color"
          class="absolute inset-y-2 rounded w-6 h-6 start-2"
          :disabled="disabled"
        />
        <Input
          ref="inputEl"
          v-model="internalValue"
          class="pl-10"
          :disabled="disabled"
          :required="required"
        />
      </div>
      <Select
        v-else-if="type === 'select'"
        v-model="internalValue"
        ref="inputEl"
        :disabled="disabled"
        :required="required"
      >
        <SelectTrigger>
          <slot name="trigger">
            <SelectValue :placeholder="placeholder" />
          </slot>
        </SelectTrigger>
        <SelectContent>
          <slot />
        </SelectContent>
      </Select>
      <Input
        v-else
        v-model="internalValue"
        ref="inputEl"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
      />
    </Label>
    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>
