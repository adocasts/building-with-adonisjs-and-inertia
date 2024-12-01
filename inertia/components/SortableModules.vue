<script setup lang="ts">
import CourseDto from '#dtos/course'
import ModuleDto from '#dtos/module'
import Organization from '#models/organization'
import { GripVertical, Pencil } from 'lucide-vue-next'
import { computed } from 'vue'
import Sortable from 'vuedraggable'

const props = defineProps<{
  organization: Organization
  course: CourseDto
  modelValue: ModuleDto[]
}>()

const emit = defineEmits(['update:modelValue'])

const modules = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <Sortable v-model="modules" item-key="id" tag="ul" group="modules" handle=".handle">
    <template #item="{ element: module, index }">
      <li class="flex flex-col border-b border-slate-200 pb-2 mb-2">
        <div
          class="flex items-center justify-between rounded-md p-2 hover:bg-slate-50 duration-300 group relative"
        >
          <div class="flex items-center gap-4">
            <div
              class="text-slate-400 hover:text-slate-950 handle cursor-move opacity-0 group-hover:opacity-100 duration-300 absolute top-1/2 -translate-y-1/2 right-full pl-2"
            >
              <GripVertical class="w-4 h-4" />
            </div>
            <span class="font-bold">{{ module.name }}</span>
            <span class="text-slate-400 text-sm slashed-zero hidden md:inline-block">
              {{ module.lessons.length }} Lessons
            </span>

            <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
              <Button
                variant="ghost"
                size="icon"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
              >
                <Pencil class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div class="flex gap-2 items-center justify-end"></div>
        </div>
      </li>
    </template>
  </Sortable>
</template>
