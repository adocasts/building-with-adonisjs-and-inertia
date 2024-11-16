<script setup lang="ts">
import DifficultyDto from '#dtos/difficulty'
import OrganizationDto from '#dtos/organization'
import { Plus } from 'lucide-vue-next'
import { computed, ref, watchEffect } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  difficulties: DifficultyDto[]
  organization: OrganizationDto
}>()

const list = ref(props.difficulties)
const { form, dialog, destroy, onSuccess } = useResourceActions<DifficultyDto>()({
  name: '',
  color: '#818cf8',
})

const replacementOptions = computed(() => {
  return props.difficulties.filter((item) => item.id !== destroy.value.resource?.id)
})

watchEffect(() => (list.value = props.difficulties))

function onEdit(resource: DifficultyDto) {
  dialog.value.open(resource, {
    name: resource.name,
    color: resource.color,
  })
}

function onDestroyShow(resource: DifficultyDto) {
  const replacement = replacementOptions.value.at(0)
  destroy.value.open(resource, {
    replacementId: replacement?.id.toString(),
  })
}

function onOrderUpdate() {
  const ids = list.value.map((item) => item.id)
  router.put('/difficulties/order', { ids }, { preserveScroll: true })
}
</script>

<template>
  <AppHead title="Difficulties" :description="`Manage the difficulties of ${organization.name}`" />

  <div class="w-full max-w-2xl mx-auto bg-background rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-4">Difficulties</h1>

      <Button size="sm" variant="ghost" @click="dialog.open()">
        <Plus class="w-3 h-3 mr-2" />
        Add Difficulty
      </Button>
    </div>

    <SortableResourceItem 
      v-model="list"
      @end="onOrderUpdate"
      @edit="onEdit"
      @destroy="onDestroyShow"
    />

    <FormDialog
      resource="Difficulty"
      v-model:open="dialog.isOpen"
      :editing="dialog.resource?.id"
      :processing="form.processing"
      @create="form.post('/difficulties', { onSuccess })"
      @update="form.put(`/difficulties/${dialog.resource?.id}`, { onSuccess })"
    >
      <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
      <FormInput type="color" label="Color" v-model="form.color" :error="form.errors.color" />
    </FormDialog>

    <ConfirmDestroyDialog
      v-model:open="destroy.isOpen"
      title="Delete Difficulty?"
      :action-href="`/difficulties/${destroy.resource?.id}`"
      :action-data="destroy.data"
    >
      <div v-if="destroy.resource?.meta.courses_count != 0">
        What difficulty would you like to assign the
        {{ destroy.resource?.meta.courses_count }} courses using {{ destroy.resource?.name }}

        <FormInput
          type="select"
          label="Difficulty"
          v-model="destroy.data.replacementId"
          class="mt-4"
        >
          <SelectItem v-for="item in replacementOptions" :key="item.id" :value="item.id.toString()">
            {{ item.name }}
          </SelectItem>
        </FormInput>
      </div>
      <div v-else>
        Are you sure you'd like to delete your
        <strong>{{ destroy.resource?.name }}</strong> difficulty? No courses are currently using
        this difficutly
      </div>
    </ConfirmDestroyDialog>
  </div>
</template>
