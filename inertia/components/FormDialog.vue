<script setup lang="ts">
import { Loader } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  editing?: boolean
  processing: boolean
  resource: string
}>()

const emit = defineEmits(['update:open', 'submit'])

const internalOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})
</script>

<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <slot name="title">
          <DialogTitle v-if="editing">Edit {{ resource }}</DialogTitle>
          <DialogTitle v-else>Add {{ resource }}</DialogTitle>
        </slot>
      </DialogHeader>

      <form :id="resource" class="grid gap-4 py-4" @submit.prevent="$emit('submit')">
        <slot />
      </form>

      <DialogFooter>
        <Button type="submit" :form="resource" :disable="processing">
          <Loader v-if="processing" class="mr-2 w-4 h-4 animate-spin" />
          <span v-if="editing">Update {{ resource }}</span>
          <span v-else>Add {{ resource }}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
