<script setup lang="ts">
import OrganizationDto from '#dtos/organization'
import { router, useForm } from '@inertiajs/vue3'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'

const props = defineProps<{
  organization: OrganizationDto
  organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())
const { form, dialog, destroy, onSuccess } = useResourceActions<OrganizationDto>()({
  name: '',
})

watchEffect(() => (organizationId.value = props.organization.id.toString()))

function onOrganizationChange(activeId: string) {
  router.get(`/organizations/${activeId}`)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        {{ organization.name }}
        <ChevronsUpDown class="w-4 h-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel> Your Organizations ({{ organizations.length }}) </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup v-model="organizationId" @update:modelValue="onOrganizationChange">
        <DropdownMenuRadioItem
          v-for="org in organizations"
          :key="org.id"
          :value="org.id.toString()"
        >
          {{ org.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="dialog.open(organization, { name: organization.name })">
        Edit {{ organization.name }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="destroy.open(organization)">
        Delete {{ organization.name }}
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="dialog.open()">Add Organization</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <FormDialog
    resource="Organization"
    v-model:open="dialog.isOpen"
    :editing="dialog.resource?.id"
    :processing="form.processing"
    @create="form.post('/organizations', { onSuccess })"
    @update="form.put(`/organizations/${organization.id}`, { onSuccess })"
  >
    <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Organization?"
    :action-href="`/organizations/${destroy.resource?.id}`"
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> organization? All data associated with this
    organization, including courses and lessons, will be deleted forever.
  </ConfirmDestroyDialog>
</template>
