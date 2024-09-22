<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { toast } from 'vue-sonner'

type Toast = string | Record<string, string>

const props = defineProps<{
  messages: Record<string, Toast>
}>()

onMounted(() => {
  runToasts({
    exceptions: props.messages.errorsBag,
    success: props.messages.success,
  })
})

watchEffect(() => {
  runToasts({
    exceptions: props.messages.errorsBag,
    success: props.messages.success,
  })
})

function runToasts(toasts: { exceptions: Toast; success: Toast }) {
  const exceptions = getToastMessage(toasts.exceptions)
  const success = getToastMessage(toasts.success)

  if (exceptions.length) {
    toast.error('An error occurred', {
      description: exceptions,
    })
  }

  if (success.length) {
    toast.success(success)
  }
}

function getToastMessage(toast: Toast) {
  if (typeof toast === 'string') return toast
  if (typeof toast === 'object') return Object.values(toast).join(', ')
  return ''
}
</script>

<template>
  <Sonner class="pointer-events-auto" rich-colors />
</template>
