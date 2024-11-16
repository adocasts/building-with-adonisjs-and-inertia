<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Sortable from 'vuedraggable'
import { GripVertical, Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: T[]
}>()

const emit = defineEmits(['update:modelValue', 'end', 'edit', 'destroy'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <Sortable v-model="internalValue" item-key="id" tag="ul" handle=".handle" class="flex flex-col" @end="$emit('end')">
    <template #item="{ element: item }">
      <li class="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-slate-100 duration-300 group">
        <div class="flex items-center gap-4">
          <div class="handle text-slate-300 group-hover:text-slate-950 duration-300 cursor-move">
            <GripVertical class="w-4 h-4" />
          </div>

          <div
            class="w-3 h-3 rounded-full bg-slate-100"
            :style="{ backgroundColor: item.color }"
          ></div>

          <span class="font-bold">{{ item.name }}</span>
          <span v-if="item.isDefault" class="text-sm text-slate-400">(Default)</span>
        </div>

        <div class="flex gap-2 opacity-0 group-hover:opacity-100 duration-300">
          <Button size="xs" @click="$emit('edit', item)">
            <Pencil class="w-3 h-3" aria-label="Edit Difficulty" />
          </Button>

          <Button size="xs" variant="destructive" @click="$emit('destroy', item)">
            <Trash2 class="w-3 h-3" aria-label="Delete Difficulty" />
          </Button>
        </div>
      </li>
    </template>
  </Sortable>
</template>