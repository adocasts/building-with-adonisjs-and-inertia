<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: string
  time: string
}>()

const emit = defineEmits(['update:date', 'update:time'])

const date = computed({
  get: () => props.date,
  set: (value) => emit('update:date', value),
})

const time = computed({
  get: () => props.time,
  set: (value) => emit('update:time', value),
})
</script>

<template>
  <div class="flex w-full max-w-sm items-center gap-1.5">
    <Input type="date" v-model="date" />
    <Input type="time" v-model="time" />
  </div>
</template>
