<script setup lang="ts">
import AccessLevelDto from '#dtos/access_level';
import DifficultyDto from '#dtos/difficulty';
import StatusDto from '#dtos/status';
import { router } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number
  options: StatusDto[] | DifficultyDto[] | AccessLevelDto[]
  patch?: {
    path: string
    key: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const selected = computed(() => props.options.find((item) => item.id === props.modelValue))

const internalValue = computed({
  get: () => props.modelValue.toString(),
  set: async (value) => {
    const canPatch = props.patch?.path && props.patch?.key
    const intValue = parseInt(value)

    if (canPatch) {
      await router.patch(props.patch.path, {
        [props.patch.key]: intValue
      }, {
        preserveScroll: true
      })
    }


    emit('update:modelValue', intValue)
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="relative">
        <span class="opacity-25 absolute w-full h-full left-0 top-0 rounded" :style="{ backgroundColor: selected?.color }" />
        <div class="text-xs flex items-center gap-2 px-2.5 py-1 -my-1 rounded-full relative z-10">
          <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: selected?.color }" />
          <span class="opacity-75">{{ selected?.name ?? 'No Match Found' }}</span>
        </div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup v-model="internalValue">
        <DropdownMenuRadioItem
          v-for="option in options"
          :key="option.id"
          :value="option.id.toString()"
        >
          <span class="w-4 h-4 rounded-full absolute left-2 -ml-px" :style="{ backgroundColor: option.color }" />
          {{ option.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>