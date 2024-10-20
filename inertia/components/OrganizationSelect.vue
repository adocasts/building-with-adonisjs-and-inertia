<script setup lang="ts">
import OrganizationDto from '#dtos/organization'
import { router, useForm } from '@inertiajs/vue3'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  organization: OrganizationDto
  organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())
const isDialogOpen = ref(false)
const dialogForm = useForm({
  name: '',
})

watchEffect(() => (organizationId.value = props.organization.id.toString()))

function onOrganizationChange(activeId: string) {
  router.get(`/organizations/${activeId}`)
}

function onSubmit() {
  dialogForm.post('/organizations', {
    onSuccess: () => {
      dialogForm.reset()
      isDialogOpen.value = false
    },
  })
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

      <DropdownMenuItem @click="isDialogOpen = true">Add Organization</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <FormDialog
    resource="Organization"
    v-model:open="isDialogOpen"
    :processing="dialogForm.processing"
    @submit="onSubmit"
  >
    <FormInput label="Name" v-model="dialogForm.name" :error="dialogForm.errors.name" />
  </FormDialog>
</template>
