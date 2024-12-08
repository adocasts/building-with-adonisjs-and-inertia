<script setup lang="ts">
import CourseDto from '#dtos/course'
import ModuleDto from '#dtos/module'
import Organization from '#models/organization'
import { EllipsisVertical, GripVertical, Pencil, Plus } from 'lucide-vue-next'
import { computed, nextTick, ref } from 'vue'
import Sortable from 'vuedraggable'
import { useResourceActions } from '~/composables/resource_actions'

const props = defineProps<{
  organization: Organization
  course: CourseDto
  modelValue: ModuleDto[]
}>()

const emit = defineEmits(['update:modelValue'])
const dialogFocusEl = ref()

const prefixUrl = computed(() => `/courses/${props.course.id}`)

const modules = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<ModuleDto>()({
  name: '',
  statusId: props.organization.statuses.at(0)?.id,
})

function onCreate() {
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onEdit(resource: ModuleDto) {
  dialog.value.open(resource, {
    name: resource.name,
    statusId: resource.statusId,
  })
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}
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
                @click="onEdit(module)"
              >
                <Pencil class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div class="flex gap-2 items-center justify-end">
            <TagSelector
              v-model="module.statusId"
              :options="organization.statuses"
              :patch="{ path: `${prefixUrl}/modules/${module.id}/tags`, key: 'statusId' }"
            />

            <DropdownMenu>
              <DropdownMenuTrigger class="ml-2 text-slate-400 hover:text-slate-950 duration-300">
                <EllipsisVertical class="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="onEdit(module)">Edit</DropdownMenuItem>
                <DropdownMenuItem @click="destroy.open(module)">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <SortableLessons v-model="modules[index]" :organization="organization" :course="course" />
      </li>
    </template>
  </Sortable>

  <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
    <Plus class="w-4 h-4" />
    Add Module
  </Button>

  <FormDialog
    resource="Series Module"
    v-model:open="dialog.isOpen"
    :editing="dialog.resource?.id"
    :processing="form.processing"
    @create="form.post(`${prefixUrl}/modules`, { onSuccess, preserveScroll: true })"
    @update="
      form.put(`${prefixUrl}/modules/${dialog.resource?.id}`, { onSuccess, preserveScroll: true })
    "
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My Cool Module"
    />

    <FormInput type="select" label="Status" v-model="form.statusId" :error="form.errors.statusId">
      <SelectItem v-for="status in props.organization.statuses" :key="status.id" :value="status.id">
        {{ status.name }}
      </SelectItem>
    </FormInput>
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Module?"
    :action-href="`${prefixUrl}/modules/${destroy.resource?.id}`"
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> module? All this module's data, including lessons,
    will be deleted forever.
  </ConfirmDestroyDialog>
</template>
