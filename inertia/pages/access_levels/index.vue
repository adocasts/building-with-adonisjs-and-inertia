<script setup lang="ts">
import AccessLevelDto from '#dtos/access_level'
import OrganizationDto from '#dtos/organization'
import { Plus } from 'lucide-vue-next'
import { computed, ref, watchEffect } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  accessLevels: AccessLevelDto[]
  organization: OrganizationDto
}>()

const list = ref(props.accessLevels)
const { form, dialog, destroy, onSuccess } = useResourceActions<AccessLevelDto>()({
  name: '',
  color: '#818cf8',
})

const replacementOptions = computed(() => {
  return props.accessLevels.filter((item) => item.id !== destroy.value.resource?.id)
})

watchEffect(() => (list.value = props.accessLevels))

function onEdit(resource: AccessLevelDto) {
  dialog.value.open(resource, {
    name: resource.name,
    color: resource.color,
  })
}

function onDestroyShow(resource: AccessLevelDto) {
  const replacement = replacementOptions.value.at(0)
  destroy.value.open(resource, {
    replacementId: replacement?.id.toString(),
  })
}

function onOrderUpdate() {
  const ids = list.value.map((item) => item.id)
  router.put('/access-levels/order', { ids }, { preserveScroll: true })
}
</script>

<template>
  <AppHead title="Access Levels" :description="`Manage the access levels of ${organization.name}`" />

  <div class="w-full max-w-2xl mx-auto bg-background rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-4">Access Levels</h1>

      <Button size="sm" variant="ghost" @click="dialog.open()">
        <Plus class="w-3 h-3 mr-2" />
        Add Access Level
      </Button>
    </div>

    <SortableResourceItem 
      v-model="list"
      @end="onOrderUpdate"
      @edit="onEdit"
      @destroy="onDestroyShow"
    />

    <FormDialog
      resource="Access Level"
      v-model:open="dialog.isOpen"
      :editing="dialog.resource?.id"
      :processing="form.processing"
      @create="form.post('/access-levels', { onSuccess })"
      @update="form.put(`/access-levels/${dialog.resource?.id}`, { onSuccess })"
    >
      <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
      <FormInput type="color" label="Color" v-model="form.color" :error="form.errors.color" />
    </FormDialog>

    <ConfirmDestroyDialog
      v-model:open="destroy.isOpen"
      title="Delete Access Level?"
      :action-href="`/access-levels/${destroy.resource?.id}`"
      :action-data="destroy.data"
    >
      <div v-if="destroy.resource?.meta.courses_count != 0">
        What access level would you like to assign the
        {{ destroy.resource?.meta.courses_count }} courses &amp;
        {{ destroy.resource?.meta.lessons_count }} lessons using {{ destroy.resource?.name }}

        <FormInput
          type="select"
          label="Access Level"
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
        this access level
      </div>
    </ConfirmDestroyDialog>
  </div>
</template>
