<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    cancelText?: string
    actionText?: string
    actionHref: string
    actionData?: Record<string, any>
  }>(),
  {
    cancelText: 'Cancel',
    actionText: 'Delete',
  }
)

const emit = defineEmits(['update:open', 'confirm'])

const internalOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})
</script>

<template>
  <AlertDialog v-model:open="internalOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle v-if="title">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>
          <slot />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ cancelText }}</AlertDialogCancel>
        <AlertDialogAction as-child>
          <Link
            v-if="actionHref"
            :href="actionHref"
            :data="actionData"
            method="delete"
            as="button"
            preserve-scroll
          >
            {{ actionText }}
          </Link>
          <Button v-else type="button" variant="destructive" @click="emit('confirm')">
            {{ actionText }}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
